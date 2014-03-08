$( document ).ready(function() {
  BillController.bindEvents();
});

var BillController = {
  bindEvents: function() {
    $("#bill").submit(BillController.calculateAndDisplay);
  },
  calculateAndDisplay: function() {
    event.preventDefault();
    BillCalculations.calculateBillAndTip();
    BillViewer.displayBillWithTip();
  }
}

var BillCalculations = {
  tip: 0,
  billTotal: 0,
  tipPercentage: 0.15,
  calculateBillAndTip: function() {
    BillCalculations.assignBillTotal();
    BillCalculations.addTip();
    BillViewer.displayBillWithTip();
  },
  assignBillTotal: function() {
    BillCalculations.billTotal = parseFloat($('input[name="total"]').val());
  },
  addTip: function() {
    BillCalculations.billTotal = BillCalculations.billTotal * (1 + BillCalculations.tipPercentage);
  }
};

var BillViewer = {
  displayBillWithTip: function() {
    $('#bill-with-tip').html("Bill w/tip: $ " + BillCalculations.billTotal.toFixed(2));
  }
}