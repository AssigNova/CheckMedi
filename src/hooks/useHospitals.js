import { useEffect, useState } from "react";
import { apiUrl } from "../api";
import axios from "axios";

export default function useHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHospitals = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(apiUrl("/api/hospitals"));
        setHospitals(res.data);
      } catch (err) {
        setError("Failed to load hospitals");
      }
      setLoading(false);
    };
    fetchHospitals();
  }, []);

  return { hospitals, loading, error };
}
