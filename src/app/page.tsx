"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const TodoLists = [
    {
      type: "Fruit",
      name: "Apple",
    },
    {
      type: "vegetableList",
      name: "Broccoli",
    },
    {
      type: "vegetableList",
      name: "Mushroom",
    },
    {
      type: "Fruit",
      name: "Banana",
    },
    {
      type: "vegetableList",
      name: "Tomato",
    },
    {
      type: "Fruit",
      name: "Orange",
    },
    {
      type: "Fruit",
      name: "Mango",
    },
    {
      type: "Fruit",
      name: "Pineapple",
    },
    {
      type: "vegetableList",
      name: "Cucumber",
    },
    {
      type: "Fruit",
      name: "Watermelon",
    },
    {
      type: "vegetableList",
      name: "Carrot",
    },
  ];

  const [tempList, setTempList] = useState<
    {
      name: string;
      type: string;
    }[]
  >(TodoLists);

  const [fruitList, setFruitList] = useState<
    {
      name: string;
      type: string;
    }[]
  >([]);

  const [vegetableList, setVegetableList] = useState<
    {
      name: string;
      type: string;
    }[]
  >([]);

  const useRefTempList = useRef(tempList);

  const clickToPush = (item: { name: any; type: any }) => {
    setTempList((prevTempList) => {
      const removeItem = prevTempList.filter((i) => i.name !== item.name);
      return removeItem;
    });

    if (item.type === "Fruit") {
      setFruitList((prevFruitList) => [...prevFruitList, item]);
    } else {
      setVegetableList((prevVegetableList) => [...prevVegetableList, item]);
    }

    setTimeout(() => {
      autoBackTemp(item);
    }, 5000);
  };

  useEffect(() => {
    useRefTempList.current = tempList;
  }, [tempList]);

  const autoBackTemp = (item: { name: any; type: any }) => {


const currentTempList = useRefTempList.current;

    if (item.type === "Fruit") {
      setFruitList((prev) => prev.filter((i) => i.name !== item.name));
    } else {
      setVegetableList((prev) => prev.filter((i) => i.name !== item.name));
    }
    if (!currentTempList.includes(item)) {
      setTempList((prev) => [...prev, item]);
    }
  };

  const clickToBack = (item: { name: string; type: string }) => {
    if (item.type === "Fruit") {
      const removeItem = fruitList.filter((i) => i.name !== item.name);
      setFruitList(removeItem);

      setTempList((prev) => [...prev, item]);
    } else {
      const removeItem = vegetableList.filter((i) => i.name !== item.name);
      setVegetableList(removeItem);
      setTempList((prev) => [...prev, item]);
    }
  };

  return (
    <div className="font-bold grid grid-cols-3 max-w-[1240px] gap-3">
      <div className="w-[200px] flex flex-col gap-2">
        {tempList.map((item, index) => (
          <div
            key={index}
            className="p-2 border-2 rounded-sm cursor-pointer"
            onClick={() => clickToPush(item)}
          >
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <div className="w-[200px] min-h-[650px] border-2">
        <div className="bg-gray-200 p-2">
          <span>Fruit</span>
        </div>
        <div className="flex flex-col gap-2">
          {fruitList.map((item, index) => (
            <div
              onClick={() => clickToBack(item)}
              key={index}
              className={`${
                index === 0 && `mt-2`
              } p-2 mx-2 border-2 rounded-sm cursor-pointer`}
            >
              <span className="">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[200px] min-h-[650px] border-2">
        <div className="bg-gray-200 p-2">
          <span>Vegetable</span>
        </div>
        <div className="flex flex-col gap-2">
          {vegetableList.map((item, index) => (
            <div
              onClick={() => clickToBack(item)}
              key={index}
              className={`${
                index === 0 && `mt-2`
              } p-2 mx-2 border-2 rounded-sm cursor-pointer`}
            >
              <span className="">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
