/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import BreadCrumb from "@/components/beardcrumb";
import Header from "@/components/header";
import TableComponent from "@/components/tableComponent";
import { DATA } from "@/data/data";
import Image from "next/image";
import { Select, Modal, Form, InputNumber, Button } from "antd";
import { MAPPING_PLATFORM_TO_IMAGE } from "@/utils/platformToImage";
import * as _ from "lodash";
import Footer from "../components/Footer";
import { EditOutlined } from "@ant-design/icons";
import {
  GENRE_OPTIONS,
  PLATFORM_OPTIONS,
  BLOCKCHAIN_OPTIONS,
} from "@/utils/constants";

const { Option } = Select;

const BREADCRUMB_ITEMS = [
  { label: "Home", url: "#" },
  { label: "Games", url: "#" },
  { label: "Best Free P2E NFT Games in 2022", url: "#" },
];

const selectOptions = [
  {
    value: "all",
    label: "All Blockchain",
  },
  {
    value: "ethereum",
    label: "Ethereum",
  },
  {
    value: "solana",
    label: "Solana",
  },
  {
    value: "bsc",
    label: "BNB Chain",
  },
  {
    value: "other",
    label: "Other",
  },
  {
    value: "near",
    label: "NEAR",
  },
  {
    value: "polygon",
    label: "Polygon",
  },
  {
    value: "neo",
    label: "NEO",
  },
  {
    value: "immutable-x",
    label: "Immutable-X",
  },
  {
    value: "avalanche",
    label: "Avalanche",
  },
  {
    value: "harmony",
    label: "Harmony",
  },
  {
    value: "bnb-sidechain",
    label: "BNB Sidechain",
  },
  {
    value: "fantom",
    label: "Fantom",
  },
  {
    value: "arbitrum-one",
    label: "Arbitrum One",
  },
  {
    value: "moonbeam",
    label: "Moonbeam",
  },
  {
    value: "cronos",
    label: "Cronos",
  },
  {
    label: "OKExChain",
    value: "okexchain",
  },
];

export default function Home() {
  const [form] = Form.useForm();

  const [dataTable, setDataTable] = useState(
    DATA?.slice(0, 10)?.map((item, index) => {
      return { key: index + 1, Index: index + 1, ...item };
    })
  );
  const [masterData, setMasterData] = useState(DATA);
  const [filteredData, setFilteredData] = useState(DATA);

  // pagination params for table default pagesize = 10
  const [sliceFrom, setSliceFrom] = useState(0);
  const [sliceTo, setSliceTo] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [isInitComponent, setInitComponent] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalData, setModalData] = useState(null);
  const [disableSubmit, setDisableSubmit] = useState(true);

  const columns = [
    {
      title: "#",
      dataIndex: "Index",
      key: "orderNumber",
      render: (text) => <span className="text-base font-medium">{text}</span>,
      width: "50px",
      align: "center",
    },
    {
      title: "NAME",
      dataIndex: "Name",
      key: "name",
      render: (name, record) => {
        return (
          <div className="flex items-center justify-start gap-4">
            <div className="left w-10 h-10">
              <img src={record?.ImageUrl} alt={name} className="rounded-full" />
            </div>
            <div className="right flex flex-col">
              <span className="text-black-100 text-base font-medium mb-1">
                {name}
              </span>
              <div className="flex">
                <img
                  className="w-5 h-5 rounded-full mr-1"
                  src={record?.BlockChains?.[0]?.ExtendValue}
                  alt="blockchain image"
                />
                <span className="text-gray-500 text-sm">
                  {record?.BlockChains?.[0]?.Name}
                </span>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "GENRE",
      dataIndex: "Genres",
      key: "genre",
      render: (genres) => {
        if (genres?.length > 0) {
          return (
            <div className="flex items-center justify-start gap-[6px]">
              {genres?.map((genre, index) => {
                return (
                  <div key={index}>
                    <span className="text-base">{genre?.Name}</span>
                    {index !== genres?.length - 1 && <span>|</span>}
                  </div>
                );
              })}
            </div>
          );
        }
        return null;
      },
    },
    {
      title: "PLATFORM",
      dataIndex: "Platforms",
      key: "platforms",
      render: (platforms) => {
        if (platforms?.length > 0) {
          return (
            <div className="flex items-center justify-end gap-[6px]">
              {platforms?.map((platform, index) => {
                return (
                  <div key={index}>
                    <Image
                      key={index}
                      width={24}
                      height={24}
                      src={MAPPING_PLATFORM_TO_IMAGE[platform?.Code]}
                      alt={platform?.Code}
                    />
                  </div>
                );
              })}
            </div>
          );
        }
        return null;
      },
      align: "right",
    },
    {
      title: "ACTION",
      key: "action",
      render: (record) => {
        return (
          <div
            className="cursor-pointer"
            onClick={() => {
              console.log("record: ", record);
              setIsModalOpen(true);
              setModalData(record);
              form.setFieldsValue({
                genres: record?.Genres?.map((item) => item?.Code),
                platforms: record?.Platforms?.map((item) => item?.Code),
                blockchains: record?.BlockChains?.map((item) => item?.Code),
                price: record?.Price,
              });
            }}
          >
            <EditOutlined />
          </div>
        );
      },
      width: "100px",
      align: "right",
    },
  ];

  useEffect(() => {
    initData();
    const timer = setTimeout(() => {
      setInitComponent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isInitComponent) {
      setDataTable(_.cloneDeep(filteredData?.slice(sliceFrom, sliceTo)));
    }
  }, [filteredData, sliceFrom, sliceTo]);

  const initData = () => {
    const dataFormatted = DATA?.map((item, index) => {
      return { key: index + 1, Index: index + 1, ...item };
    });

    setMasterData(dataFormatted);
    setFilteredData(dataFormatted);
  };

  const handleChange = (value) => {
    setSliceFrom(0);
    setSliceTo(10);
    setCurrentPage(1);

    if (value === "all") {
      setFilteredData(masterData);
    } else {
      filterData(value);
    }
  };

  const filterData = (selectedValue) => {
    const result = masterData?.filter((item) => {
      if (checkBlockchain(item, selectedValue)) {
        return item;
      }

      return false;
    });

    setFilteredData(result);
  };

  const checkBlockchain = (item, selectedValue) => {
    return item?.BlockChains?.some(
      (blockchain) => blockchain?.Code === selectedValue
    );
  };

  const onChangePagination = (page, pageSize) => {
    setCurrentPage(page);
    setSliceFrom((page - 1) * pageSize || 0);
    setSliceTo(page * pageSize || 10);
  };

  const handleModalOk = () => {
    const formValues = form?.getFieldsValue();
    const formatData = formatDataToSave(formValues);

    const findIndexInFilteredData = filteredData?.findIndex(
      (item) => item?.key === modalData.key
    );
    const findIndexInMasterData = masterData?.findIndex(
      (item) => item?.key === modalData.key
    );

    const newMasterData = _.cloneDeep(masterData);
    newMasterData[findIndexInMasterData] = {
      ...masterData[findIndexInMasterData],
      ...formatData,
    };
    setMasterData(newMasterData);

    const newFilteredData = _.cloneDeep(filteredData);
    newFilteredData[findIndexInFilteredData] = {
      ...filteredData[findIndexInFilteredData],
      ...formatData,
    };
    setFilteredData([...newFilteredData]);
    resetModal();
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setModalData(null);
    form.resetFields();
  };

  const handleModalCancel = () => {
    resetModal();
  };

  const formatDataToSave = (values) => {
    const blockchains = BLOCKCHAIN_OPTIONS?.filter((item) => {
      if (values?.blockchains?.includes(item?.value)) {
        return true;
      }

      return false;
    })?.map((item) => {
      return {
        Name: item.label,
        Code: item.value,
        ExtendValue: item.ExtendValue,
      };
    });

    const genres = GENRE_OPTIONS?.filter((item) => {
      if (values?.genres?.includes(item?.value)) {
        return true;
      }

      return false;
    })?.map((item) => {
      return {
        Name: item.label,
        Code: item.value,
      };
    });

    const platforms = PLATFORM_OPTIONS?.filter((item) => {
      if (values?.platforms?.includes(item?.value)) {
        return true;
      }

      return false;
    })?.map((item) => {
      return {
        Name: item.label,
        Code: item.value,
      };
    });

    return {
      BlockChains: blockchains,
      Genres: genres,
      Platforms: platforms,
      Price: values?.price || null,
    };
  };

  const handleFormChange = () => {
    const { price, blockchains, genres, platforms } = form?.getFieldsValue();
    if (
      !price ||
      !blockchains?.length ||
      !genres?.length ||
      !platforms?.length
    ) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  };

  return (
    <div className="home-page-container text-black-100">
      <Header />
      <main className="w-[1344px] mx-auto mt-8">
        <BreadCrumb className="mb-8" items={BREADCRUMB_ITEMS} />
        <h2 className="text-lg font-medium mb-[6px]">
          Best Free P2E NFT Games in 2022
        </h2>
        <span className="mb-[29px]">
          Are you looking for Games that Free-to-play? Here are the best F2P NFT
          games available.
        </span>
        <div className="mt-[30px] mb-5">
          <Select
            defaultValue="all"
            onChange={handleChange}
            options={selectOptions}
          />
        </div>
        <TableComponent
          columns={columns}
          data={dataTable}
          total={filteredData?.length || 0}
          onChangePagination={onChangePagination}
          currentPage={currentPage}
          showingText={`Showing ${sliceFrom + 1} - ${sliceTo} out of ${
            filteredData?.length || 0
          }`}
        />
      </main>
      <div className="mt-[106px]">
        <Footer />
      </div>

      <Modal
        title="Edit Blockchain"
        open={isModalOpen}
        onCancel={handleModalCancel}
        width={900}
        centered={true}
        className="font-Open_Sans"
        footer={
          <>
            <Button onClick={handleModalCancel}>Cancel</Button>
            <Button
              type="primary"
              disabled={disableSubmit}
              onClick={handleModalOk}
            >
              Ok
            </Button>
          </>
        }
      >
        <div className="flex justify-between">
          <div className="flex flex-col items-center w-[200px]">
            <img
              className="rounded-full mb-4"
              src={modalData?.ImageUrl}
              alt="Blockchain image"
              width={200}
              height={200}
            />
            <span className="text-lg font-medium text-black-100">
              {modalData?.Name || ""}
            </span>
          </div>
          <div className="w-[600px]">
            <Form
              name="basic"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              autoComplete="off"
              form={form}
              onChange={handleFormChange}
            >
              <Form.Item
                label="Genres"
                name="genres"
                rules={[{ required: true, message: "Please input genre!" }]}
              >
                <Select
                  mode="multiple"
                  options={GENRE_OPTIONS}
                  className="font-Open_Sans"
                />
              </Form.Item>
              <Form.Item
                label="Platforms"
                name="platforms"
                rules={[{ required: true, message: "Please input platforms!" }]}
              >
                <Select
                  mode="multiple"
                  options={PLATFORM_OPTIONS}
                  className="font-Open_Sans"
                />
              </Form.Item>
              <Form.Item
                label="Blockchains"
                name="blockchains"
                rules={[
                  { required: true, message: "Please input blockchain!" },
                ]}
              >
                <Select
                  mode="multiple"
                  options={BLOCKCHAIN_OPTIONS}
                  className="font-Open_Sans"
                />
              </Form.Item>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please input price!" }]}
                className="font-Open_Sans"
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  step={0.000000001}
                />
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
