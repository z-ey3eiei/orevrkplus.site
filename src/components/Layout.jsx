import { Outlet } from "@tanstack/react-router";
import Header from "./Header";
import Footer from "./Footer";
import ActivityProvider from "@/components/system/ActivityProvider";
import StatusBar from "@/components/system/StatusBar";

export default function Layout() {
  return (
    <ActivityProvider>
      <div className="flex min-h-screen flex-col bg-background text-foreground pb-[calc(3rem_+_env(safe-area-inset-bottom))]">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <StatusBar />
    </ActivityProvider>
  );
}