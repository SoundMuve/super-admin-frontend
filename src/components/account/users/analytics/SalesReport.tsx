import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import { getDateRangeBydays } from '@/util/dateTime';
import ReportMainDashComponent from './ReportMainDash';
import ReportTabsComponent from './ReportTabs';
import SRAT_SinglesComponent from './salesReportTables/SRAT_Singles';
import SRAT_AlbumsComponent from './salesReportTables/SRAT_Albums';
import SRAT_LocationComponent from './salesReportTables/SRAT_Location';
import SRAT_MonthsComponent from './salesReportTables/SRAT_Months';
import { useUserAnalyticsStore } from '@/state/userAnalyticsStore';
import { useUserAnalyticsHook } from '@/hooks/users/useUserAnalyticsHook';


function SalesReport() {
    const {_id} = useParams();

    const [reportType, setReportType] = useState<'Months' | 'Location' | 'Albums' | 'Singles'>('Singles');
    const [dateRange, setDateRange] = useState(getDateRangeBydays(365));

    const salesReportTotalEarnings = useUserAnalyticsStore((state) => state.salesReportTotalEarnings);
    const salesReportMonths = useUserAnalyticsStore((state) => state.salesReportMonths);
    const salesReportLocations = useUserAnalyticsStore((state) => state.salesReportLocations);
    const salesReportAlbum = useUserAnalyticsStore((state) => state.salesReportAlbum);
    const salesReportSingles = useUserAnalyticsStore((state) => state.salesReportSingles);
   
    const { 
        getSalesReportAnalytics,
    } = useUserAnalyticsHook(_id || '');

    useEffect(() => {
        getSalesReportAnalytics(dateRange.startDate, dateRange.endDate);
    }, [dateRange]);

    // useEffect(() => {
    //     if (reportType == "Location") {
    //         getLocationsAnalytics();
    //     } else if (reportType == "Albums") {
    //         getSalesReportSingle_or_AlbumAnalytics("album");
    //     } else if (reportType == "Singles") {
    //         getSalesReportSingle_or_AlbumAnalytics("single");
    //     } else if (reportType == "Months") {
    //         getSalesReportMonthlyAnalytics();
    //     } else {
    //         getSalesReportSingle_or_AlbumAnalytics("single");
    //     }
    // }, [reportType]);


    return (
        <Box sx={{ mt: 7 }}>
            <ReportMainDashComponent 
                // dateRange={reportMainDashData.sales_period}
                setDateRangeValue={(value) => setDateRange(value)}
                dateRangeValue={dateRange }
                // not too sure about the intended data for play, 
                // since backend didn't account for it, then its same as Streams
                streamPlays={ salesReportTotalEarnings.streamPlay }
                // albums={reportMainDashData.totalAlbums}
                albums={ salesReportTotalEarnings.totalAlbums }
                albumSold={ salesReportTotalEarnings.albumSold }
                // sold={reportMainDashData.single_sold}
                // singles={reportMainDashData.totalSingles}
                singles={ salesReportTotalEarnings.totalSingles }
                singlesSold={ salesReportTotalEarnings.noSold }
                // streams={reportMainDashData.totalStreams}
                streamRevenue={ salesReportTotalEarnings.streamRevenue }
                // totalEarnedBalance={reportMainDashData.totalRevenue}
                totalEarnedBalance={salesReportTotalEarnings.revenue}
            />

            <ReportTabsComponent reportType={reportType} setReportType={setReportType} />
            

            {
                reportType == "Singles" &&
                <SRAT_SinglesComponent 
                    tBodyContent={salesReportSingles}
                    // displayDownloadReport={ 
                    //     salesReportSingles && salesReportSingles.length ? true : false 
                    // }
                />
            }

            {
                reportType == "Albums" &&
                <SRAT_AlbumsComponent 
                    tBodyContent={salesReportAlbum} 
                    // displayDownloadReport={
                    //     salesReportAlbum && salesReportAlbum.length ? true : false 
                    // }
                />
            }

            {/* {
                reportType == "Stores" &&
                <SalesReportStoresAnalyticsTableComponent 
                    headerTitle={storesHeaderTitle} 
                    tBodyContent={storesBodyContent} 
                    darkTheme={darkTheme}
                />
            } */}

            {
                reportType == "Location" &&
                <SRAT_LocationComponent 
                    tBodyContent={salesReportLocations} 
                />
            }

            {
                reportType == "Months" &&
                <SRAT_MonthsComponent 
                    tBodyContent={salesReportMonths}
                />
            }

        </Box>
    )
}

export default SalesReport;