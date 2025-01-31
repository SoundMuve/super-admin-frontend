import { create } from "zustand";
import { 
    albumAndSinglesAnalyticsInterface,
    analyticsInterface, locationAnalyticsInterface, 
    salesReportTotalEarningsAnalyticsInterface 
} from "@/typeInterfaces/analytics.interface";


const defaultTotalsEarnings = {
    albumSold: 0,
    noSold: 0,
    revenue: 0,
    streamRevenue: 0,
    streamPlay: 0,
}

const defaultSalesReportTotalEarnings: salesReportTotalEarningsAnalyticsInterface = {
    ...defaultTotalsEarnings,
    totalAlbums: 0,
    totalSingles: 0,

    // albumSold: 0,
    // noSold: 0,
    // revenue: 0,
    // streamRevenue: 0,
    // streamPlay: 0
};



type _typeInterface_ = {
    salesReportTotalEarnings: salesReportTotalEarningsAnalyticsInterface,
    salesReportMonths: analyticsInterface[],
    salesReportLocations: locationAnalyticsInterface[],
    salesReportAlbum: albumAndSinglesAnalyticsInterface[],
    salesReportSingles: albumAndSinglesAnalyticsInterface[],
    
    _setSalesReportTotalEarnings: (totalEarnings: salesReportTotalEarningsAnalyticsInterface) => void;
    _setSalesReportMonths: (months: analyticsInterface[]) => void;
    _setSalesReportLocations: (locations: locationAnalyticsInterface[]) => void;
    _setSalesReportAlbum: (album: albumAndSinglesAnalyticsInterface[]) => void;
    _setSalesReportSingles: (singles: albumAndSinglesAnalyticsInterface[]) => void;

    // updatePlayerAsync: () => Promise<void>;
};
  
export const useUserAnalyticsStore = create<_typeInterface_>((set) => ({
    salesReportTotalEarnings: defaultSalesReportTotalEarnings,
    salesReportMonths: [],
    salesReportLocations: [],
    salesReportAlbum: [],
    salesReportSingles: [],

    _setSalesReportTotalEarnings: (totalEarnings) => {
        set((_state) => {
            return {
                salesReportTotalEarnings: totalEarnings
            };
        });
    },

    _setSalesReportMonths: (months) => {
        set((_state) => {
            return {
                salesReportMonths: months
            };
        });
    },

    _setSalesReportLocations: (locations) => {
        set((_state) => {
            return {
                salesReportLocations: locations
            };
        });
    },

    _setSalesReportAlbum: (album) => {
        set((_state) => {
            return {
                salesReportAlbum: album
            };
        });
    },

    _setSalesReportSingles: (singles) => {
        set((_state) => {
            return {
                salesReportSingles: singles
            };
        });
    },
    
}));
  