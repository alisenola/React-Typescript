import { useEffect, useState } from "react";
import axios from "axios";

import { Col, Container, Row, Text } from "@nextui-org/react";
import { Autocomplete } from ".";

import { Country } from "../../ts/interfaces/Country.interface";

import classes from "./ui.module.css";

const AutocompleteWrapper = () => {
  const [data, setData] = useState<Country[]>([]);
  const getApiData = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/lang/eng").then((res) => res.json()) as Country[];
      setData(res);
    } catch (error: any) {
      console.log(error);
	  
	  // Use error status code  which can be returend from the rest api side
	  switch (error.status) {
		case 500:
			throw new Error("Internal Server Error");
		case 404:
			throw new Error("Not found");
		default:
			throw new Error(error.message ?? "Unknown Error" )
	  }
    }
  };
  useEffect(() => {
	const getData = setTimeout(() => {/*implement debounce*/
		getApiData();
	}, 1000);
 
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Text
            h1
            css={{
              textAlign: "center",
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}
          >
            English-speaking countries:
          </Text>
        </Col>
      </Row>
      <Row>
        <Col className={classes.autocompleteContainer}>
          <Autocomplete data={data} />
        </Col>
      </Row>
    </Container>
  );
};

export default AutocompleteWrapper;
