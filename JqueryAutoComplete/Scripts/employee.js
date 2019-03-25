$(function () {

    LoadEmployee()

    function LoadEmployee() {
        $('#myAutocomplete').attr("disabled", true).html('<img src="' + BaseUrl + '/Content/images/loader.gif" style="margin-right:0.5em;" height="21" width="21"> LOADING ...');
        $('.myAutocomplete').attr("disabled", true).html('<img src="' + BaseUrl + '/Content/images/loader.gif" style="margin-right:0.5em;" height="21" width="21"> LOADING ...');


        $.ajax({
            url: '/Home/GetEmployee',
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: {},
            success: function (result) {
                var myObject = JSON.parse(result);
                var availableTags = [];

                var data = myObject.items.Table;
                myObject.items.Table.forEach(function (value) {
                    var obj = {};
                    obj.label = value.EMP_NAME;
                    obj.value = value.EMP_OFFICE_CODE;
                    obj.EMP_DESG_NAME = value.EMP_DESG_NAME;
                    obj.track = value;
                    availableTags.push(obj);
                });
                var termTemplate = "<span class='ui-autocomplete-term'>%s</span>";

                $('#myAutocomplete').attr("disabled", false).html(' ');
                $('.myAutocomplete').attr("disabled", false).html(' ');

                $('#myAutocomplete').autocomplete({
                    source: availableTags,
                    multiselect: true,
                    open: function (e, ui) {
                        var
                            acData = $(this).data('ui-autocomplete'),
                            styledTerm = termTemplate.replace('%s', acData.term);
                        acData
                            .menu
                            .element
                            .find('table')
                            .find('.lblName')
                            .each(function () {
                                var me = $(this);
                                me.html(me.html().replace(acData.term, styledTerm));
                                //me.html(me.html().replace(acData.term,styledTerm));
                            });
                    }
                }).data("ui-autocomplete")._renderItem = function (ul, item) {
                    return $("<li></li>")
                        .data("item.autocomplete", item)
                        .append("<table><tr><td class='lblName'>" + item.label + "</td></tr><tr><td> <span class='time text-muted'>" + item.EMP_DESG_NAME + "</span></td></tr></table>")
                        .appendTo(ul);
                };;

                $('#myAutocompleteList').autocomplete({
                    source: availableTags,
                    multiselect: true,
                    open: function (e, ui) {
                        var
                            acData = $(this).data('ui-autocomplete'),
                            styledTerm = termTemplate.replace('%s', acData.term);
                        acData
                            .menu
                            .element
                            .find('table')
                            .find('.lblName')
                            .each(function () {
                                var me = $(this);
                                me.html(me.html().replace(acData.term, styledTerm));
                                //me.html(me.html().replace(acData.term,styledTerm));
                            });
                    }
                }).data("ui-autocomplete")._renderItem = function (ul, item) {
                    return $("<li></li>")
                        .data("item.autocomplete", item)
                        .append("<table><tr><td class='lblName'>" + item.label + "</td></tr><tr><td> <span class='time text-muted'>" + item.EMP_DESG_NAME + "</span></td></tr></table>")
                        .appendTo(ul);
                };;


                jQuery.ui.autocomplete.prototype._resizeMenu = function () {
                    var ul = this.menu.element;
                    console.log(this.element.outerWidth());
                    ul.outerWidth(600);
                }
            },
            error: function (result) {
                alert("Failed");
            }
        });

    }

    $('#clearAll').click(function () {
        $("div.ui-autocomplete-multiselect-item").remove();
    });

    $('#reload').click(function () {
        LoadEmployee();
    });

    $("#Save").click(function () {
        var url = BaseUrl + "/Content/images/loader.gif";
        $('#Save').attr("disabled", true).html('<img src="' + url + '" style="margin-right:0.5em;" height="21" width="21"> Adding ...');
        var employeeList = [];
        $('.ui-autocomplete-multiselect-item').each(function (i, obj) {
            var employeeObj = {};
            if ($(this).children('.employee-id').attr('id')) {
                employeeObj.EMPLOYEE_ID = $(this).children('.employee-id').attr('id');
                employeeObj.EMPLOYEE_NAME = $(this).clone().children().remove().end().text();
                employeeObj.SIGNATURE_STATUS = 0;
                employeeObj.EMP_DESG_NAME = $(this).children('.EMP_DESG_NAME').text();
                employeeObj.EMP_BRANCH_NAME = $(this).children('.EMP_BRANCH_NAME').text();
                employeeObj.EMP_DEPT_NAME = $(this).children('.EMP_DEPT_NAME').text();
                employeeObj.PRESENT_DESG_REPORTORDER = $(this).children('.PRESENT_DESG_REPORTORDER').text();
                employeeObj.NEXT_PROMOTION_DUE_DATE = $(this).children('.NEXT_PROMOTION_DUE_DATE').text();
                if (employeeObj.NEXT_PROMOTION_DUE_DATE) {
                    employeeObj.NEXT_PROMOTION_DUE_DATE = new Date(employeeObj.NEXT_PROMOTION_DUE_DATE);
                } else {
                    employeeObj.NEXT_PROMOTION_DUE_DATE = null;
                }
                employeeObj.EMP_RANK = $(this).children('.EMP_RANK').text();
                employeeList.push(employeeObj);
            }
        });
        if (employeeList.length > 0) {
            var url = BaseUrl + "/Content/images/loader.gif";
            $('#Save').attr("disabled", true).html('<img src="' + url + '" style="margin-right:0.5em;" height="21" width="21"> Adding ...');

            obj = JSON.stringify({ 'EMPLOYEE_LIST': employeeList }),
            $.ajax({
                url: '/Home/Save',
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: obj,
                success: function (result) {
                    var myObject = JSON.parse(result);
                    var availableTags = [];
                    myObject.forEach(function (value) {
                        var obj = {};
                        obj.label = value.EMPLOYEE_NAME;
                        obj.value = value.EMPLOYEE_ID;
                        obj.EMP_DESG_NAME = value.EMP_DESG_NAME;
                        obj.track = value;
                        availableTags.push(obj);
                    });
                    for (var i = 0; i < availableTags.length; i++) {
                        $("#myAutocompleteList").autocomplete({}).data('ui-autocomplete')._trigger('select', 'autocompleteselect', { item: availableTags[i] });
                    }
                    $('#Save').attr("disabled", false).html('<i class="icon-content-save" style="color: inherit"></i> Add');
                },
                error: function (result) {
                    var myObject = JSON.parse(result);
                    alert(myObject);
                    $('#Save').attr("disabled", false).html('<i class="icon-content-save" style="color: inherit"></i> Add');
                }
            });
        } else {
            alert("Type Employee....");
            $('#Save').attr("disabled", false).html('<i class="icon-content-save" style="color: inherit"></i> Add');

        }
    });
});