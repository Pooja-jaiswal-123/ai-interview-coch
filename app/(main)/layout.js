"use client";

import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './_components/AppSidebar';
import DashboardProvider from './provider';
import WelcomeContainer from './dashboard/_components/WelcomeContainer';

const DashboardLayout = ({ children }) => {
  return (
    <SidebarProvider>

      {/* SIDEBAR */}
      <AppSidebar />
      
      {/* MAIN WRAPPER */}
      <div className="flex w-full">

        {/* LEFT AREA — Trigger line commented but kept */}
        <div className="mt-1 ml-1">
          {/* <SidebarTrigger /> */}  
        </div>

     
        <div className="w-full">
          <DashboardProvider>

            {/* Welcome Box */}
            <WelcomeContainer />

            {/* Page Content */}
            {children}

          </DashboardProvider>
        </div>

      </div>

    </SidebarProvider>
  );
};

export default DashboardLayout;
