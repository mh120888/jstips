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
    $("#bill").submit(BillController.calcAndDisplayOnPercentage);
    $('#choices a').on('click', BillController.calcAndDisplayOnImpression);
  },
  calcAndDisplayOnPercentage: function() {
    event.preventDefault();
    BillCalculations.calculateBillAndTip();
    BillViewer.displayBillWithTip();
  },
  calcAndDisplayOnImpression: function() {
    event.preventDefault();
    BillCalculations.calcBillAndTip($(this));
    BillViewer.displayBillWithTip();
  },
};

var BillCalculations = {
  tip: 0,
  billWithoutTip: 0,
  tipPercentage: 0.15,
  calculateBillAndTip: function() {
    BillCalculations.assignBillTotal();
    BillCalculations.assignTipPercentage();
    BillCalculations.calculateTip();
    BillCalculations.addTip();
  },
  calcBillAndTip: function(scope) {
    BillCalculations.assignBillTotal();
    BillCalculations.grabTipPercentage(scope);
    BillCalculations.calculateTip();
    BillCalculations.addTip();
  },
  grabTipPercentage: function(scope) {
    BillCalculations.tipPercentage = parseFloat(scope.attr('data-tip'));
  },
  assignBillTotal: function() {
    BillCalculations.billTotal = parseFloat($('input[name="total"]').val());
    if ( isNaN(BillCalculations.billTotal) ) {
      BillCalculations.billTotal = 0;
    }
  },
  assignTipPercentage: function() {
    BillCalculations.tipPercentage = $('input[name="tip"]').val()/100;
  },
  addTip: function() {
    return BillCalculations.billTotal + BillCalculations.tip;
  },
  calculateTip: function() {
    BillCalculations.tip = BillCalculations.billTotal * BillCalculations.tipPercentage;
  }
};

var BillViewer = {
  displayBillWithTip: function() {
    $('#bill-with-tip').html("<p>Tip is: $ " + BillCalculations.tip.toFixed(2) + "</p>"
      + "<p>Total: $ " + BillCalculations.addTip().toFixed(2) + "</p>");
  },
  toggleSlider: function() {
    $('#choices').hide();
    $('input[type="submit"]').show();
    $('#slider').show();
    BillViewer.scrollToChoices();
  },
  toggleChoices: function() {
    $('#slider').hide();
    $('input[type="submit"]').hide();
    $('#choices').show();
    BillViewer.scrollToChoices();
  },
  scrollToChoices: function() {
    event.preventDefault();
    $('html, body').animate({
    scrollTop: $('#bill-with-tip').offset().top
    }, 600);
  }
};
