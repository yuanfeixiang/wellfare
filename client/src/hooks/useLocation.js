import { useState, useEffect } from "react";

function useLocation() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(userLocation);
        },
        (error) => {
          const userLocation = {
            latitude: 37.566535,
            longitude: 126.9779692,
          };
          setLocation(userLocation);
        }
      );
    } else {
      const userLocation = {
        latitude: 37.566535,
        longitude: 126.9779692,
      };
      setLocation(userLocation);
    }
  }, []);

  return location;
}

export default useLocation;
