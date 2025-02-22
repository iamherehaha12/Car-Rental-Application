import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Carousel from "./Carousel";
import Footer from "../NavbarComponent/Footer";
import { useNavigate } from "react-router-dom";
import CarCard from "../CarComponent/CarCard";

const HomePage = () => {
  const navigate = useNavigate();

  const [variants, setVariants] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [companyId, setCompanyId] = useState("");

  const [tempCompanyId, setTempCompanyId] = useState("");

  const retrieveAllCompany = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/car/company/fetch/all"
    );
    return response.data;
  };

  const retrieveAllVariant = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/car/variant/fetch/all"
    );
    return response.data;
  };

  const retrieveAllVariantByCompanyId = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/variant/fetch/company-wise?companyId=" +
        companyId
    );
    return response.data;
  };

  useEffect(() => {
    const getAllCompany = async () => {
      const resCompany = await retrieveAllCompany();
      if (resCompany) {
        setCompanies(resCompany.companies);
      }
    };

    const getAllVariant = async () => {
      if (companyId !== "") {
        const res = await retrieveAllVariantByCompanyId();
        if (res) {
          setVariants(res.variants);
        }
      } else {
        const res = await retrieveAllVariant();
        if (res) {
          setVariants(res.variants);
        }
      }
    };
    getAllCompany();
    getAllVariant();
  }, [companyId]);

  const searchCompany = (e) => {
    e.preventDefault();
    setCompanyId(tempCompanyId);
  };

  return (
    <div
      className="container-fluid mb-2"
      style={{
        backgroundColor: "#1f1f1f",
      }}
    >
      <Carousel />

      

      <div className="col-md-12 mt-3 mb-5">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {variants.map((variant) => {
            return <CarCard item={variant} key={variant.id} />;
          })}
        </div>
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default HomePage;
