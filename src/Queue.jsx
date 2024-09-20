import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Queue.css";
const Queue = () => {
  const navigate = useNavigate();
  const baseUrl = "https://qwaiting.com/restapi";
  const restApiKey = "fe14a6-00d1ae-8126d0-bfe34b-0fdd9a";
  const [data, setData] = useState({
    visible: false,
    records: [],
  });
  const [childCatData, setChildCatData] = useState({
    visible: false,
    records: [],
  });

  const [subcategory, setSubcategory] = useState({
    visible: false,
    records: [],
  });

  const [saveId, setSaveId] = useState({
    parentCategoryId: 0,
    childCategoryId: 0,
    subCategoryId: 0,
  });
  console.log(saveId);

  const fetchData = async () => {
    try {
      // const data = {};

      const headers = {
        // 'Content-Type': 'application/json',
        "rest-api-key": restApiKey,
      };
      const response = await axios.get(`${baseUrl}/category`, { headers });
      console.log(response.data.categories);
      setData({
        visible: true,
        records: response.data.categories,
      });
    } catch (error) {
      console.log(error);
      console.error("There was an error fetching the data!", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleParentCategory = (rec) => {
    if (rec.Childcategory && rec.Childcategory.length) {
      setData((_) => {
        return { ..._, visible: false };
      });
      console.log(rec);
      setChildCatData({
        visible: true,
        records: rec.Childcategory,
      });
      setSaveId((_) => {
        console.log("_");
        console.log(_);

        return { ..._, parentCategoryId: rec.Category.id };
      });
    } else {
      setSaveId((_) => {
        console.log("_");
        console.log(_);

        return { ..._, parentCategoryId: rec.Category.id };
      });
      console.log("saveId");
      console.log({ ...saveId, parentCategoryId: rec.Category.id });
      console.log("saveId");
      ticketGenerateData({ ...saveId, parentCategoryId: rec.Category.id });
    }
  };

  const handleChildCategory = (rec) => {
    if (rec.Subcategory && rec.Subcategory.length) {
      console.log(rec.Subcategory);
      setChildCatData((_) => {
        return { ..._, visible: false };
      });

      console.log(rec);

      setSubcategory({
        visible: true,
        records: rec.Subcategory,
      });
      console.log(rec);
      setSaveId((_) => {
        console.log("_");
        console.log(_);

        return { ..._, childCategoryId: rec.id };
      });
    } else {
      setSaveId((_) => {
        console.log("_");
        console.log(_);

        return { ..._, childCategoryId: rec.id };
      });
      ticketGenerateData({ ...saveId, childCategoryId: rec.id });
    }
  };

  const handleSubCategory = (rec) => {
    if (rec.id) {
      setSubcategory((_) => {
        return { ..._, visible: false };
      });
      setSaveId((_) => {
        console.log("_");
        console.log(_);

        return { ..._, subCategoryId: rec.id };
      });
      ticketGenerateData({ ...saveId, subCategoryId: rec.id });
    }
  };

  const childCategoryBack = () => {
    setChildCatData({
      visible: false,
      records: [],
    });

    setData((_) => {
      console.log("_");
      console.log(_);

      return { ..._, visible: true };
    });
    setSaveId((_) => {
      console.log("_");
      console.log(_);

      return {
        ..._,
        parentCategoryId: 0,
        childCategoryId: 0,
        subCategoryId: 0,
      };
    });
  };

  const subCategoryBack = () => {
    setSubcategory({
      visible: false,
      records: [],
    });
    setChildCatData((_) => {
      console.log("_");
      console.log(_);

      return { ..._, visible: true };
    });
    setSaveId((_) => {
      console.log("_");
      console.log(_);

      return { ..._, childCategoryId: 0, subCategoryId: 0 };
    });
  };

  // Ticket Generate

  const ticketGenerateData = async (categoryIds) => {
    try {
      // Create a FormData object
      const formData = new FormData();
      formData.append("parentCategoryId", categoryIds.parentCategoryId || "");
      formData.append("childCategoryId", categoryIds.childCategoryId || "");
      formData.append("subCategoryId", categoryIds.subCategoryId || "");
      formData.append("name", "mohit");
      formData.append("contact", "7888845544");
      formData.append("categoryId", categoryIds.parentCategoryId || "");

      // Log the FormData to the console
      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }

      const headers = {
        "Content-Type": "multipart/form-data",
        "rest-api-key": restApiKey,
      };
      const response = await axios.post(
        `${baseUrl}/ticket_generate`,
        formData,
        { headers }
      );
      console.log("ticketGenerateData");
      console.log(response);
      const ticketId = response.data.id;
      console.log(ticketId);
      // router
      // ticketgenerate/1234
      navigate(`/ticketgenerate/${ticketId}`);
    } catch (error) {
      console.error(error.getMessage);
    }
  };
  // useEffect(() => {
  //   ticketGenerateData()
  // }, []);

  return (
    <>
      <div
        class="container"
        style={{
          display: "grid",
          gridTemplateColumns: " 1fr 1fr",
          gap: "30px",
          padding: "40px",
        }}
      >
        {data.visible &&
          data.records.map((rec) => {
            return (
              <div class="column">
                <h2 class="heading" onClick={() => handleParentCategory(rec)}>
                  {rec.Category.name}
                </h2>
              </div>
            );
          })}

        {childCatData.visible &&
          childCatData.records.map((rec) => {
            return (
              <>
                <div class="column">
                  <h2 class="heading" onClick={() => handleChildCategory(rec)}>
                    {rec.name}
                  </h2>
                </div>
              </>
            );
          })}

        {subcategory.visible &&
          subcategory.records.map((rec) => {
            return (
              <>
                <div class="column">
                  <h2 class="heading" onClick={() => handleSubCategory(rec)}>
                    {rec.name}
                  </h2>
                </div>
              </>
            );
          })}
      </div>

      <div class="qr-section">
        <Link className="center-button" to="/">
          Home
        </Link>
        {childCatData.visible && (
          <Link
            class="center-button"
            style={{ marginLeft: "20px" }}
            onClick={childCategoryBack}
          >
            Back
          </Link>
        )}
        {subcategory.visible && (
          <Link
            class="center-button"
            style={{ marginLeft: "20px" }}
            onClick={subCategoryBack}
          >
            Back
          </Link>
        )}
      </div>
    </>
  );
};

export default Queue;
