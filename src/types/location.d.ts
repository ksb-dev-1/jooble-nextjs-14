interface Location {
  id: number;
  name: string;
  display_name: string;
  lat: string;
  lon: string;
}

interface LocationSearchProps {
  onLocationSelect: (location: Location) => void;
  placeholder?: string;
}
