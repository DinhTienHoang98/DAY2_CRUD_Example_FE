$(document).ready(function () {
    console.log("xxx")
    getAll();

});

function getAll() {
    // Call Web API to get a list
    $.ajax({
        url: "http://localhost:3000/api/employee/get-all",
        type: "GET",
        dataType: "json",
        success: function (products) {
            if ($("#employeeList tbody").length != 0) {
                $("#employeeList").empty();
            }
            getAllSuccess(products);
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        },
    });
}

function getAllSuccess(employeeList) {
    // Iterate over the collection of data
    $.each(employeeList, function (index, e) {
        // Add a row to the Product table
        addRow(e);
    });
}

function addRow(e) {
    // Check if <e> tag exists, add one if not
    if ($("#employeeList tbody").length == 0) {
        $("#employeeList").append("<tbody></tbody>");
    }
    // Append row to <table>
    $("#employeeList tbody").append(renderTable(e));
}

function renderTable(e) {
    var ret =
        "<tr>" +
        "<td>" +
        e.fullName +
        "</td>" +
        "<td>" +
        e.emailId +
        "</td>" +
        "<td>" +
        e.salary +
        "</td>" +
        "<td>" +
        e.city +
        "</td>" +
        "<td>" +
        `<a onClick="onEdit(this)">Edit</a>
                         <a onClick="onDelete(this)">Delete</a>` +
        "</tr>";
    return ret;
}

function handleException(request, message, error) {
    var msg = "";
    msg += "Code: " + request.status + "\n";
    msg += "Text: " + request.statusText + "\n";
    if (request.responseJSON != null) {
        msg += "Message" + request.responseJSON.Message + "\n";
    }
    alert(msg);
}