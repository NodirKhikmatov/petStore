import "../../../css/home.css";

import {setNewDishes, setPopularDishes, setTopUsers} from "./slice";

import ActiveUsers from "./ActiveUsers";
import Advertisement from "./Advertisement";
import {Dispatch} from "@reduxjs/toolkit";
import Events from "./Events";
import {Member} from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import NewDishes from "./NewDishes";
import PopularDishes from "./PopularDishes";
import {Product} from "../../../lib/types/product";
import {ProductCollection} from "../../../lib/enum/product.enum";
import ProductService from "../../services/ProductService";
import Statistics from "./Statistics";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

/**REDUX SLICE & SELECTOR */

const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  const {setPopularDishes, setNewDishes, setTopUsers} = actionDispatch(
    useDispatch()
  );

  //selector:store => Data

  useEffect(() => {
    //Backend server datat request => Data
    const product = new ProductService();

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: ProductCollection.TOYS,
      })
      .then((data) => {
        console.log("data passed here", data);
        setPopularDishes(data);
      })
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        // productCollection: ProductCollection.DISH,
      })
      .then((data) => {
        console.log("data passed here", data);
        setNewDishes(data);
      })
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => setTopUsers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      {/* <ActiveUsers /> */}
      <Events />
    </div>
  );
}
