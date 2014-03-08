$( document ).ready(function() {
  Bill.bindEvents();
});

var Bill = {
  billTotal: 0,
  bindEvents: function() {
    $("#bill").submit(Bill.serializeInput);
  },
  serializeInput: function() {
    event.preventDefault();
    billTotal = $('input[name="total"]').val();
    debugger;
  },
};