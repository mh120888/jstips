$( document ).ready(function() {
  BillController.bindEvents();
  ChoiceController.bindEvents();
});

var ChoiceController = {
  bindEvents: function() {
    $('#range a').on('click', BillViewer.toggleSlider);
    $('#impression a').on('click', BillViewer.toggleChoices);
  }
};

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
};

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
    BillCalculations.tipPercentage = $('input[name="tip"]').val()/100;
  },
  addTip: function() {
    BillCalculations.billTotal = BillCalculations.billTotal * (1 + BillCalculations.tipPercentage);
  }
};

var BillViewer = {
  displayBillWithTip: function() {
    $('#bill-with-tip').html("Bill w/tip: $ " + BillCalculations.billTotal.toFixed(2));
  },
  toggleSlider: function() {
    $('#choices').hide();
    $('#slider').show();
  },
  toggleChoices: function() {
    $('#slider').hide();
    $('#choices').show();
  }
};
