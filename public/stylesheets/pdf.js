//whole download

$("#pdf").on("click", function () {
    $("#tableinfo").tableHTMLExport({
        type: 'pdf',
        filename: 'studentInfo.pdf',
        ignoreRows: '.actbutton',
        ignoreColumns: '.actbutton'
    });
});

$("#csv").on("click", function () {
    $("#tableinfo").tableHTMLExport({
        type: 'csv',
        filename: 'studentInfo_csv.csv',
        ignoreRows: '.actbutton',
        ignoreColumns: '.actbutton'
    });
});


//specific download
$("#stupdf").on("click", function () {
    $("#studentprofile").tableHTMLExport({
        type: 'pdf',
        filename: 'studentInfo.pdf',
        ignoreRows: '.actbutton',
        ignoreColumns: '.actbutton'
    });
});

$("#stucsv").on("click", function () {
    $("#studentprofile").tableHTMLExport({
        type: 'csv',
        filename: 'studentInfo_csv.csv',
        ignoreRows: '.actbutton',
        ignoreColumns: '.actbutton'
    });
});

