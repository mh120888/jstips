$( document ).ready(function() {
  BillController.bindEvents();
});

var BillController = {
  bindEvents: function() {
    $("#bill").submit(BillController.calculateAndDisplay);
    $('#choices a').on('click', BillController.calcAndShow);
  },
  calculateAndDisplay: function() {
    event.preventDefault();
    BillCalculations.calculateBillAndTip();
    BillViewer.displayBillWithTip();
  },
  calcAndShow: function() {
    event.preventDefault();
    BillCalculations.calcBillAndTip($(this));
    BillViewer.displayBillWithTip();
  },
}

var BillCalculations = {
  tip: 0,
  billTotal: 0,
  tipPercentage: 0.15,
  calculateBillAndTip: function() {
    BillCalculations.assignBillTotal();
    BillCalculations.assignTipPercentage();
    BillCalculations.addTip();
  },
  calcBillAndTip: function(scope) {
    BillCalculations.assignBillTotal();
    BillCalculations.grabTipPercentage(scope);
    BillCalculations.addTip();
  },
  grabTipPercentage: function(scope) {
    BillCalculations.tipPercentage = parseFloat(scope.attr('data-tip'));
  },
  assignBillTotal: function() {
    BillCalculations.billTotal = parseFloat($('input[name="total"]').val());
  },
  assignTipPercentage: function() {
    BillCalculations.tipPercentage = $('input[name="tip"]').val()/100
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
