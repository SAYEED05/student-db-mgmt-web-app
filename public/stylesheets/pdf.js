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

$("#tran").click(function () {
    $("table").each(function () {
        var $this = $(this);
        var newrows = [];
        $this.find("tr").each(function () {
            var i = 0;
            $(this).find("td, th").each(function () {
                i++;
                if (newrows[i] === undefined) { newrows[i] = $("<tr></tr>"); }
                if (i == 1)
                    newrows[i].append("<th>" + this.innerHTML + "</th>");
                else
                    newrows[i].append("<td>" + this.innerHTML + "</td>");
            });
        });
        $this.find("tr").remove();
        $.each(newrows, function () {
            $this.append(this);
        });
    });

    return false;
});

