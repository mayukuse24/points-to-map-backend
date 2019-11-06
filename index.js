const _ = require('lodash'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser')
    esInterface = require('./interfaces/es'),
    port = 3000; // TODO: pick from env variables

// Used for parsing incoming request as JSON
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Welcome to points to map!'));

app.post('/', (req, res) => {
    var address,
        reqBody = _.get(req, 'body');;
    
    // TODO: validate request
    console.log(req.body);
    
    if (!reqBody) { return res.status(400).send('No body in request'); };

    address = _.get(reqBody, 'address');
    
    if (!address) { return res.status(400).send('Address not provided or incorrect request format'); }

    
    
    // TODO: covert user provided address to latitude, longitude
    // google maps api
    var NodeGeocoder = require('node-geocoder');
 
    var options = {
    provider: 'google',
 
     // Optional depending on the providers
    httpAdapter: 'https', // Default
    // TODO provide API key
    apiKey: ' ', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
    };
    
    
   var geocoder = NodeGeocoder(options);
     
   var geocoder = new google.maps.Geocoder();
   var address = " ";

    geocoder.geocode( { 'address': address}, function(results, status) 
    {

        if (status == ) 
        {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            alert(latitude);
        } 
    });  
    
 
    
    
    
    // Query elasticsearch to retrieve locations in range. TODO: update long/lat input
    esInterface.getLocationsInRange({ latitude: 47.29762, longitude : 8.3086}, 10, function (err, locations) {
        if (err) { return res.status(404).send(err); } // TODO: better error handling/status code

        // send response to frontend for displaying points
        res.send(locations);
    });
});

app.listen(port, () => {
    console.log(`Webserver listening on port ${port}!`) // TODO: need log levels

    // Create connection to elasticsearch server
    esInterface.connect()
});
