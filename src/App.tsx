import { useEffect, useMemo, useRef, useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth, useQuery, useMutation } from "convex/react";
import legacyHtml from "./legacy.html?raw";
import { api } from "../convex/_generated/api";

export default function App() {
  const { signIn, signOut } = useAuthActions();
  const { isAuthenticated } = useConvexAuth();
  const isAuthPopup = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("authPopup") === "1" || params.get("authPopupComplete") === "1";
  }, []);
  const [bootstrapCache] = useState(() => {
    try {
      const raw = sessionStorage.getItem("sandify_bootstrap");
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw) as {
        data: { sandTypes: any[]; dealers: any[]; trucks: any[] };
        cachedAt: number;
      };
      if (!parsed?.data || !parsed.cachedAt) {
        return null;
      }
      const maxAgeMs = 5 * 60 * 1000;
      if (Date.now() - parsed.cachedAt > maxAgeMs) {
        return null;
      }
      return parsed.data;
    } catch {
      return null;
    }
  });
  const viewer = useQuery(
    api.users.viewer,
    isAuthenticated ? {} : "skip",
  );
  const profile = useQuery(
    api.users.profile,
    isAuthenticated ? {} : "skip",
  );
  const prefs = useQuery(
    api.users.getPrefs,
    isAuthenticated ? {} : "skip",
  );
  const orders = useQuery(
    api.sand.listOrders,
    isAuthenticated ? {} : "skip",
  );
  const bootstrap = useQuery(api.sand.bootstrap);
  const setPrefs = useMutation(api.users.setPrefs);
  const upsertProfile = useMutation(api.users.upsertProfile);
  const createOrder = useMutation(api.sand.createOrder);
  const updateOrderStatus = useMutation(api.sand.updateOrderStatus);
  const submitSellerApplication = useMutation(
    api.applications.submitSellerApplication,
  );
  const submitTransportApplication = useMutation(
    api.applications.submitTransportApplication,
  );
  const scriptLoaded = useRef(false);
  const bootstrapRef = useRef(bootstrapCache);
  const legacyRoot = useMemo(
    () => ({
      __html: legacyHtml,
    }),
    [],
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("authPopupComplete") === "1" && window.opener) {
      window.opener.location.reload();
      window.close();
      return;
    }
    if (
      params.get("authPopup") === "1" &&
      window.opener &&
      window.name === "sandify_google_auth"
    ) {
      void signIn("google", {
        flow: "signIn",
        redirectTo: `${window.location.origin}/?authPopupComplete=1`,
      });
    }
  }, [signIn]);

  useEffect(() => {
    if (bootstrap?.sandTypes && bootstrap?.dealers && bootstrap?.trucks) {
      sessionStorage.setItem(
        "sandify_bootstrap",
        JSON.stringify({ data: bootstrap, cachedAt: Date.now() }),
      );
      bootstrapRef.current = bootstrap;
    }
  }, [bootstrap]);

  useEffect(() => {
    const data = bootstrapRef.current ?? bootstrap;
    if (isAuthPopup) {
      return;
    }
    if (!data?.sandTypes || !data?.dealers || !data?.trucks) {
      return;
    }
    (window as any).__sandTypesData = data.sandTypes;
    (window as any).__dealersData = data.dealers;
    (window as any).__trucksData = data.trucks;
    if (scriptLoaded.current || (window as any).__sandifyScriptInjected) {
      return;
    }
    (window as any).__sandifyScriptInjected = true;

    const inject = () => {
      if (document.getElementById("sandify-legacy-script")) {
        return;
      }
      const script = document.createElement("script");
      script.id = "sandify-legacy-script";
      script.src = "/app.js";
      script.async = true;
      script.onload = () => {
        scriptLoaded.current = true;
        (window as any).__convexAuthSignIn = signIn;
        (window as any).__convexAuthSignOut = signOut;
        (window as any).__convexSetPrefs = (prefs: {
          location: string;
          theme: string;
        }) => setPrefs(prefs);
        (window as any).__convexSaveProfile = (data: {
          name: string;
          email: string;
          phone: string;
        }) => upsertProfile(data);
        (window as any).__convexCreateOrder = (data: {
          orderNumber: string;
          sandId?: string;
          dealerId?: string;
          truckId?: string;
          sandName: string;
          dealerName: string;
          truckName: string;
          quantity: number;
          total: number;
          paymentMethod: string;
          address: string;
        }) => createOrder(data as any);
        (window as any).__convexUpdateOrderStatus = (data: {
          orderId: string;
          status: string;
        }) => updateOrderStatus(data as any);
        (window as any).__convexSubmitSellerApp = (data: {
          company: string;
          contactName: string;
          phone: string;
          email: string;
          location: string;
          details: string;
        }) => submitSellerApplication(data as any);
        (window as any).__convexSubmitTransportApp = (data: {
          company: string;
          contactName: string;
          phone: string;
          email: string;
          vehicleType: string;
          capacity: string;
          baseLocation: string;
        }) => submitTransportApplication(data as any);
        (window as any).__convexSignInWithPassword = (
          email: string,
          password: string,
        ) => signIn("password", { flow: "signIn", email, password });
        (window as any).__convexSignUpWithPassword = (
          name: string,
          email: string,
          password: string,
        ) => signIn("password", {
          flow: "signUp",
          email,
          password,
          name,
          createAccount: true,
        });
      };
      document.body.appendChild(script);
    };

    const scheduleIdle = () => {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(inject, { timeout: 1200 });
      } else {
        setTimeout(inject, 600);
      }
    };

    let injected = false;
    const injectOnce = () => {
      if (injected) {
        return;
      }
      injected = true;
      inject();
    };
    const onInteraction = () => injectOnce();

    scheduleIdle();
    window.addEventListener("pointerdown", onInteraction, { once: true });
    window.addEventListener("keydown", onInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", onInteraction);
      window.removeEventListener("keydown", onInteraction);
    };
  }, [
    signIn,
    signOut,
    bootstrap,
    setPrefs,
    upsertProfile,
    createOrder,
    updateOrderStatus,
    submitSellerApplication,
    submitTransportApplication,
  ]);

  useEffect(() => {
    if (!scriptLoaded.current) {
      return;
    }
    if (isAuthenticated && viewer) {
      const nextUser = {
        id: viewer._id,
        name:
          profile?.name ||
          viewer.name ||
          viewer.email?.split("@")[0] ||
          "User",
        email: profile?.email || viewer.email || "user@email.com",
        phone: profile?.phone || viewer.phone || "",
        joined: viewer.createdAt
          ? new Date(viewer.createdAt).toLocaleDateString("en-IN")
          : new Date().toLocaleDateString("en-IN"),
      };
      localStorage.setItem("sandify_user", JSON.stringify(nextUser));
      (window as any).state = (window as any).state ?? {};
      (window as any).state.user = nextUser;
      (window as any).showLoggedInUI?.();
      (window as any).closeModal?.("auth-modal");
      const nextLocation = prefs?.location?.trim() ?? "";
      if (nextLocation) {
        localStorage.setItem("sandify_location", nextLocation);
        (window as any).state = (window as any).state ?? {};
        (window as any).state.location = nextLocation;
        const navLocation = document.getElementById("nav-location-text");
        if (navLocation) {
          navLocation.textContent = nextLocation;
        }
      } else {
        localStorage.removeItem("sandify_location");
        (window as any).state = (window as any).state ?? {};
        (window as any).state.location = "";
      }
      if (!nextLocation) {
        setTimeout(() => {
          (window as any).openModal?.("location-modal");
        }, 300);
      }
      if (!nextUser.phone) {
        setTimeout(() => {
          (window as any).openProfileSetup?.(nextUser);
        }, 300);
      }
    }
    if (orders) {
      (window as any).state = (window as any).state ?? {};
      (window as any).state.orders = orders;
      localStorage.setItem("sandify_orders", JSON.stringify(orders));
      (window as any).renderOrders?.();
    }
  }, [isAuthenticated, viewer, profile, prefs, orders]);

  if (isAuthPopup) {
    return <div />;
  }
  return <div dangerouslySetInnerHTML={legacyRoot} />;
}
