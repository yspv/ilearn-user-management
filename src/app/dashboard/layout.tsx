import { AppSidebar } from "@/components/app-sidebar";
import { AuthProvider } from "@/components/auth-provider";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default async function Layout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <AuthProvider>
      <SidebarProvider
        defaultOpen={false}
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}
