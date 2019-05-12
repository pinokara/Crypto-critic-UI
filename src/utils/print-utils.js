export const printUtils = {
    openPrintTab : ({billID, initialVal}) => window.open(`/print/bill?billID=${billID}&initialVal=${initialVal}`)
};