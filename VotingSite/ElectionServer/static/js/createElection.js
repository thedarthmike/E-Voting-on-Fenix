 $(document).ready(function() {
    $('.datepicker').datepicker({ dateFormat: 'yy-mm-dd' });
    $('.timePicker').timepicker();
    $('.loader').height($('.submitButton').height());
    $('.loader').width($('.loader').height());
 });

function enableCastTimes(){
     $('.castTime input').prop('disabled', false);
     $('.castTime input').prop('required', true);
}

function disableCastTimes(){
     $('.castTime input').prop('disabled', true);
     $('.castTime input').prop('required', false);
}

function submit(token){
    $('.submitButton').css("display", "none");
    $('.loader').css("display", "block");
    payload = {};
    payload['name'] = $('#createElectionForm input:text[name=name]').val();
    payload['description'] = $('#createElectionForm textarea[name=description]').val();
    payload['startDate'] = $('#createElectionForm input:text[name=startDate]').val() + ' ' + $('#createElectionForm input:text[name=startTime]').val();
    payload['endDate'] = $('#createElectionForm input:text[name=endDate]').val() + ' ' + $('#createElectionForm input:text[name=endTime]').val();
    if($('#createElectionForm input:radio[name=castTimeRadioButton]:checked').val()=='true'){
        payload['openCastTime'] = $('#createElectionForm input:text[name=startCastTimes]').val();
        payload['closeCastTime'] = $('#createElectionForm input:text[name=endCastTimes]').val();
    }

    $.ajaxSetup({headers: { "X-CSRFToken": token }});
    console.log('Seding request now!');
    $.ajax({
    type: "POST",
    url: window.location.href,
    data: JSON.stringify(payload),
    success: function(msg){
        var url = window.location.toString();
        window.location = url.replace(msg['currentUrl'], msg['redirectUrl']);},
    error: function(xhr, ajaxOptions, thrownError){
        $('.submitButton').css("display", "block");
        $('.loader').css("display", "none");
        alert('Oops: ' + xhr.responseJSON['error']);
    },
    dataType: "json",
    contentType : "application/json",
    });
}