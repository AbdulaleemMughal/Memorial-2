import { Switch } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/appStore";
import { useEffect, useState } from "react";
import {
  FamilySwitchInterface,
  SiblingCardInterface,
} from "../../Interfaces/familytree.interface";
import { GrandFatherCard } from "./GrandFatherCard";
import { GrandMotherCard } from "./GrandMotherCard";
import { GrandFatherCard2 } from "./GrandFather2";
import { GrandMotherCard2 } from "./GrandMotherCard2";
import { Father } from "./Father";
import { MdAdd } from "react-icons/md";
import { SiblingCard } from "./SiblingCard";

export const FamilyTree = () => {
  const [reload, setReload] = useState<boolean>(true);
  const [mySelf, setMySelf] = useState<string>("");
  const [children, setChildren] = useState<SiblingCardInterface[]>([]);
  const [wife, setWife] = useState<SiblingCardInterface[]>([]);
  const [siblings, setSiblings] = useState<SiblingCardInterface[]>([]);
  const [familyTree, setFamilyTree] = useState<FamilySwitchInterface>({
    name: "",
    switch: false,
  });

  const pageColor = useSelector(
    (store: RootState) => store.pageColor.isPageColor
  );
  const textColor = useSelector(
    (store: RootState) => store.textColor.isTextColor
  );

  //   for initital render
  useEffect(() => {
    setReload(false);

    const familyTree = localStorage.getItem("familyTree");
    if (familyTree) {
      setFamilyTree(JSON.parse(familyTree));
    }
    const childrenData = localStorage.getItem("children");
    if (childrenData) {
      setChildren(JSON.parse(childrenData));
    }
    const wifeData = localStorage.getItem("wife");
    if (wifeData) {
      setWife(JSON.parse(wifeData));
    }
    const siblingsData = localStorage.getItem("siblings");
    if (siblingsData) {
      setSiblings(JSON.parse(siblingsData));
    }

    const me = localStorage.getItem("User-Image");
    if (me) {
      setMySelf(me);
    }
  }, []);

  // for every time the state changes
  useEffect(() => {
    if (!reload) {
      localStorage.setItem("familyTree", JSON.stringify(familyTree));
      localStorage.setItem("children", JSON.stringify(children));
      localStorage.setItem("wife", JSON.stringify(wife));
      localStorage.setItem("siblings", JSON.stringify(siblings));
    }
  }, [children, wife, siblings]);

  const handleChildren = () => {
    const newchildren = {
      id: children.length + 1,
      name: "full name",
      imgUrl: "",
    };

    setChildren((prev) => [...prev, newchildren]);
  };
  const handleWife = () => {
    const newWife = {
      id: wife.length + 1,
      name: "full name",
      imgUrl: "",
    };

    setWife((prev) => [...prev, newWife]);
  };
  const handleSiblings = () => {
    const newSibling = {
      id: siblings.length + 1,
      name: "full name",
      imgUrl: "",
    };

    setSiblings((prev) => [...prev, newSibling]);
  };

  const deleteChildrenCard = (id: number) => {
    setChildren((prev) => prev.filter((item) => item.id !== id));
  };
  const deleteWifeCard = (id: number) => {
    setWife((prev) => prev.filter((item) => item.id !== id));
  };
  const deleteSiblingCard = (id: number) => {
    setSiblings((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="flex-1 max-md:overflow-y-auto max-md:h-[calc(100vh-80px)]">
        <div className="mt-32">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[10px]">
              <input
                type="text"
                className="input-heading bg-transparent py-[5px] px-[10px] outline-none"
                style={{ color: textColor, fontFamily: "Spectral" }}
                placeholder="Family Tree"
                value={familyTree.name}
                onChange={(e) =>
                  setFamilyTree({ ...familyTree, name: e.target.value })
                }
              />
              <div
                className="h-1 w-16"
                style={{ backgroundColor: pageColor }}
              ></div>
            </div>
            <div className="flex items-center gap-1">
              <Switch
                checked={familyTree.switch}
                onChange={(e) => {
                  const newSwitchState = e.target.checked;
                  setFamilyTree({ ...familyTree, switch: newSwitchState });
                }}
                color="secondary"
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: pageColor,
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    color: pageColor,
                  },
                  "& .MuiSwitch-track": {
                    color: pageColor,
                  },
                }}
              />
              <p
                style={{ fontFamily: "Poppins", color: textColor }}
                className="font-semibold"
              >
                Enable
              </p>
            </div>
          </div>
          <div className="mt-32">
            {/* Garnd parent section */}
            <div className="flex justify-between items-center px-5">
              <div className="flex items-center">
                <div className="flex items-center">
                  <div>
                    <GrandFatherCard />
                  </div>
                  <div className="w-[75px] h-[2px] bg-black"></div>
                  <div className="w-[1px] h-[150px] bg-black relative top-[74px]"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-[1px] h-[150px] bg-black relative top-[74px]"></div>
                  <div className="w-[75px] h-[2px] bg-black"></div>
                  <div>
                    <GrandMotherCard />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center">
                  <div>
                    <GrandFatherCard2 />
                  </div>
                  <div className="w-[75px] h-[2px] bg-black"></div>
                  <div className="w-[1px] h-[150px] bg-black relative top-[74px]"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-[1px] h-[150px] bg-black relative top-[74px]"></div>
                  <div className="w-[75px] h-[2px] bg-black"></div>
                  <div>
                    <GrandMotherCard2 />
                  </div>
                </div>
              </div>
            </div>

            {/* Parent section   */}
            <div className="flex justify-between items-center pt-[4rem] px-[189px]">
              <div className="flex items-center">
                <div>
                  <Father />
                </div>
                <div className="w-[232px] h-[2px] bg-black"></div>
                <div className="w-[1px] h-[150px] bg-black relative top-[74px]"></div>
              </div>
              <div className="flex items-center">
                <div className="w-[1px] h-[150px] bg-black relative top-[74px]"></div>
                <div className="w-[232px] h-[2px] bg-black"></div>
                <div>
                  <Father />
                </div>
              </div>
            </div>

            {/* Me section */}

            <div className="flex items-center mt-[39px] px-10">
              <div className="flex justify-end items-center">
                <div className="flex w-[450px] flex-col items-center relative bottom-6">
                  {/* Fixed vertical and horizontal lines */}
                  <div className="w-[187px] h-[1px] bg-black relative left-[193px]"></div>
                  <div className="w-[2px] h-[30px] bg-black relative left-[100px] top-0"></div>

                  {/* Scrollable Card container */}
                  <div className="relative right-[50px] w-full overflow-x-auto overflow-y-hidden">
                    <div className="flex flex-row-reverse items-end gap-2 border border-black p-2 min-w-max">
                      {/* add siblings card */}
                      <div className="h-[170px] w-[130px] bg-blue-500 flex justify-center items-center">
                        <div
                          className="h-[40px] w-[40px] bg-white rounded-full flex justify-center items-center cursor-pointer"
                          onClick={handleSiblings}
                        >
                          <MdAdd style={{ fontSize: "20px" }} />
                        </div>
                      </div>

                      {/* sibling card  */}
                      {siblings.map((s) => (
                        <SiblingCard
                          key={s.id}
                          data={s}
                          setData={setSiblings}
                          onDelete={deleteSiblingCard}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Meself card */}
              <div className="bg-blue-500">
                <div className="h-[170px] w-[130px] flex justify-center items-center">
                  <div className="h-[110px] w-[85%] bg-white rounded-full flex justify-center items-center p-2">
                    <img src={mySelf} className="h-full w-full rounded-full" />
                  </div>
                </div>
              </div>

              {/* wife card section  */}
              <div className="flex items-center">
                <div className="h-[2px] w-[100px] bg-black"></div>
                <div>
                  {" "}
                  <div className="w-[450px] overflow-x-auto overflow-y-hidden">
                    <div className="w-max flex gap-2 border border-black p-2 items-end">
                      {/* wife cards  */}
                      {wife.map((w) => (
                        <SiblingCard
                          key={w.id}
                          data={w}
                          setData={setWife}
                          onDelete={deleteWifeCard}
                        />
                      ))}

                      {/* Add wifes card */}
                      <div className="h-[170px] w-[130px] bg-blue-500 flex justify-center items-center">
                        <div
                          className="h-[40px] w-[40px] bg-white rounded-full flex justify-center items-center cursor-pointer"
                          onClick={handleWife}
                        >
                          <MdAdd style={{ fontSize: "20px" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Children section */}

            <div className="flex justify-center">
              <div className="flex w-[750px] flex-col items-center relative bottom-6">
                <div className="w-[2px] h-[30px] bg-black relative top-0"></div>
                <div className="relative right-[50px] w-full overflow-x-auto overflow-y-hidden">
                  <div className="flex flex-row-reverse items-end gap-2 border border-black p-2 min-w-max">
                    <div className="h-[170px] w-[130px] bg-blue-500 flex justify-center items-center">
                      <div
                        className="h-[40px] w-[40px] bg-white rounded-full flex justify-center items-center cursor-pointer"
                        onClick={handleChildren}
                      >
                        <MdAdd style={{ fontSize: "20px" }} />
                      </div>
                    </div>
                    {children.map((children) => (
                      <SiblingCard
                        key={children.id}
                        data={children}
                        setData={setChildren}
                        onDelete={deleteChildrenCard}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
