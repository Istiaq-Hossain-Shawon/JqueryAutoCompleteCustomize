// http://jsfiddle.net/mekwall/sgxKJ/

$.widget("ui.autocomplete", $.ui.autocomplete, {
    vars: {
        retvalue: 0
    },
    options: $.extend({}, this.options, {
        multiselect: false
    }),
    _create: function(){
        this._super();
        var SelectedItemGlobal = 0;
        var self = this,
            o = self.options;

        if (o.multiselect) {
            console.log('multiselect true');

            //sessionStorage.setItem("employeeList", JSON.stringify({}));
            self.selectedItems = {};
            self.selectedItems.length = 1;
            self.multiselect = $("<div></div>")
                .addClass("ui-autocomplete-multiselect ui-state-default ui-widget")
                .css("width", self.element.width())
                .insertBefore(self.element)
                .append(self.element)
                .bind("click.autocomplete", function () {
                    self.element.focus();
                });

            var fontSize = parseInt(self.element.css("fontSize"), 10);
            function autoSize(e) {
                // Hackish autosizing
                var $this = $(this);
                $this.width(1).width(this.scrollWidth + fontSize - 1);
            };

            var kc = $.ui.keyCode;
            self.element.bind({
                "keydown.autocomplete": function (e) {
                    if ((this.value === "") && (e.keyCode == kc.BACKSPACE)) {
                        var prev = self.element.prev();
                        delete self.selectedItems[prev.text()];
                        prev.remove();
                    }
                },
                // TODO: Implement outline of container
                "focus.autocomplete blur.autocomplete": function () {
                    self.multiselect.toggleClass("ui-state-active");
                },
                "keypress.autocomplete change.autocomplete focus.autocomplete blur.autocomplete": autoSize
            }).trigger("change");

            // TODO: There's a better way?
            o.select = o.select || function (e, ui) {
                console.log(self.selectedItems);
                //self.selectedItems.each(function (index) {
                //    if (self.selectedItems[index].value == ui.item.value) {
                //        return false;
                //    }                   
                //});
                $("<div style='width:100%'></div>")
                    .addClass("ui-autocomplete-multiselect-item")
                    .text(ui.item.label)
                    .append(
                        $("<i style='    float: right;'></i>")
                            .addClass("icon  icon-delete-forever text-green")
                            .click(function () {
                                var item = $(this).parent();
                                delete self.selectedItems[item.text()];
                                item.remove();

                            })
                    )
                    .append(
                        $("<p id='" + ui.item.value + "' style='display:none'></p>")
                            .addClass("employee-id").text(ui.item.value))
                    .append($("<p style='font-size: 12px;' ></p>")
                            .addClass("EMP_DESG_NAME time text-muted").text(ui.item.track.EMP_DESG_NAME))
                    .append($("<p  style='display:none'></p>")
                            .addClass("EMP_BRANCH_NAME").text(ui.item.track.EMP_BRANCH_NAME))
                    .append($("<p  style='display:none'></p>")
                            .addClass("EMP_DEPT_NAME").text(ui.item.track.EMP_DEPT_NAME))
                    .append($("<p  style='display:none'></p>")
                            .addClass("PRESENT_DESG_REPORTORDER").text(ui.item.track.PRESENT_DESG_REPORTORDER))
                    .append($("<p  style='display:none'></p>")
                            .addClass("NEXT_PROMOTION_DUE_DATE").text(ui.item.track.NEXT_PROMOTION_DUE_DATE))
                    .append($("<p  style='display:none'></p>")
                            .addClass("EMP_RANK").text(ui.item.track.EMP_RANK))

                    .insertBefore(self.element);
                console.log("setting");

                self.selectedItems[ui.item.label] = ui.item;
                self._value("");
                return false;
            };
            /*self.options.open = function(e, ui) {
                var pos = self.multiselect.position();
                pos.top += self.multiselect.height();
                self.menu.element.position(pos);
            }*/
        } 

        return this;
    }
    ,
    getControlValue: function () {
        var fn = function () {
            this.vars.retvalue = 45 + 5;
            return this.vars.retvalue;
        }
        return fn.bind(this)
    }

});