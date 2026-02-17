import { useEffect, useMemo, useRef } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth, useQuery, useMutation } from "convex/react";
import legacyHtml from "./legacy.html?raw";
import { api } from "../convex/_generated/api";

export default function App() {
  const { signIn, signOut } = useAuthActions();
  const { isAuthenticated } = useConvexAuth();
  const viewer = useQuery(api.users.viewer);
  const sandTypes = useQuery(api.sand.listSandTypesWithUrls);
  const dealers = useQuery(api.sand.listDealers);
  const trucks = useQuery(api.sand.listTrucks);
  const profile = useQuery(api.users.profile);
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
    if (sandTypes) {
      (window as any).__sandTypesData = sandTypes;
    }
    if (dealers) {
      (window as any).__dealersData = dealers;
    }
    if (trucks) {
      (window as any).__trucksData = trucks;
    }
    if (scriptLoaded.current || (window as any).__sandifyScriptInjected) {
      return;
    }
    if (!sandTypes || !dealers || !trucks) {
      return;
    }
    (window as any).__sandifyScriptInjected = true;
    const script = document.createElement("script");
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
      const googleButtons = [
        document.getElementById("btn-google-auth"),
        document.getElementById("btn-google-auth-signup"),
      ];
      googleButtons.forEach((googleButton) => {
        if (!googleButton) {
          return;
        }
        googleButton.addEventListener("click", (event) => {
          event.preventDefault();
          void signIn("google");
        });
      });
      (window as any).__convexSignInWithPassword = (
        email: string,
        password: string,
      ) => signIn("password", { email, password });
      (window as any).__convexSignUpWithPassword = (
        name: string,
        email: string,
        password: string,
      ) => signIn("password", {
        email,
        password,
        name,
        createAccount: true,
      });
    };
    document.body.appendChild(script);
  }, [signIn, signOut, sandTypes, dealers, trucks]);

  useEffect(() => {
    if (!scriptLoaded.current) {
      return;
    }
    if (isAuthenticated && viewer) {
      const nextUser = {
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
      if (!localStorage.getItem("sandify_location")) {
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
  }, [isAuthenticated, viewer, profile]);

  return <div dangerouslySetInnerHTML={legacyRoot} />;
}
