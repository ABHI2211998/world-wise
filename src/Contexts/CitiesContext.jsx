import {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useCallback,
} from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

const initialState = {
  cities: [],
  isloading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isloading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        isloading: false,
        currentCity: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isloading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isloading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/Delete":
      return {
        ...state,
        isloading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isloading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isloading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState([]);
  // const [isloading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        // setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
        // setCities(data);
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There is and error loading cities...",
        });
      }
      // finally {
      //   setIsLoading(false);
      // }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(async function getCity(id) {
    // if the id we pass is the same as the current city . if the city we want to load is already currentcity and the id is string because everything come from url in string
    if (Number(id) === currentCity.id) return;

    dispatch({ type: "loading" });
    try {
      // setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      // setCurrentCity(data);
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch(
        {
          type: "rejected",
          payload: "There is and error loading the city...",
        },
        [currentCity.id]
      );
    }
    // finally {
    //   setIsLoading(false);
    // }
  });

  async function createcity(newCity) {
    dispatch({ type: "loading" });
    try {
      // setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      // setCities((cities) => [...cities, data]);
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There is and error creating the city...",
      });
    }
    // finally {
    //   setIsLoading(false);
    // }
  }

  async function deletecity(id) {
    dispatch({ type: "loading" });
    try {
      // setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/Delete", payload: id });
      // setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There is and error deleting the city...",
      });
    }
    // finally {
    //   setIsLoading(false);
    // }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isloading,
        currentCity,
        getCity,
        createcity,
        deletecity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

// coustom hook
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("citicontext used outside the citisprovider");
  return context;
}
export { CitiesProvider, useCities };
