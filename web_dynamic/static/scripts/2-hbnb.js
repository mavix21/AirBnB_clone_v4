$(document).ready(function () {
  const amenityIds = {};
  const amenitiesTab = $('.amenities h4');

  // Initialize amenityIds with the IDs and names of the initially checked
  // checkboxes
  $('input[type="checkbox"]:checked').each(function () {
    amenityIds[$(this).data('id')] = $(this).data('name');
  });

  // Update amenitiesTab on page load
  updateAmenitiesTab(amenityIds);

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if (this.checked) {
      amenityIds[amenityId] = amenityName;
    } else {
      delete amenityIds[amenityId];
    }

    updateAmenitiesTab(amenityIds);
  });

  function updateAmenitiesTab (amenityIds) {
    const amenitiesList = Object.values(amenityIds).join(', ');
    if (amenitiesList) {
      amenitiesTab.text(amenitiesList);
    } else {
      amenitiesTab.html('&nbsp;');
    }
  }

  const url = 'http://0.0.0.0:5001/api/v1/status';
  $.get(url, function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  }).fail(function () {
    $('#api_status').removeClass('available');
  });
});
