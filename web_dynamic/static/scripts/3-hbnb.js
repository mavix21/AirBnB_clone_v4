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

  // Task 4
  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search',
    data: '{}',
    contentType: 'application/json',
    success: function (places) {
      for (const place of places) {
        $('section.places').append(`
        <div class="places-container">
          <article class="place">
              <div class="place-header">
                <h2 class="place-name">${place.name}</h2>
                <div class="price_by_night">
                  <p>
                  ${place.price_by_night}
                  </p>
                </div>
              </div>
              <div class="information">
                <div class="info max_guest">
                  <div class="icon icon-guest"></div>
                  <p>${place.max_guest} Guest(s)</p>
                </div>
                <div class="info number_of_rooms">
                  <div class="icon icon-bed"></div>
                  <p>${place.number_rooms} Bedroom(s)</p>
                </div>
                <div class="info number_of_bathrooms">
                  <div class="icon icon-bath"></div>
                  <p>${place.number_bathrooms} Bathroom(s)</p>
                </div>
              </div>
              <div class="description-container">
                <div class="user">
                </div>
                <div class="description">
                  ${place.description}
                </div>
              </div>
          </article>
        </div>`);
      }
    },
    dataType: 'json'
  });
});
