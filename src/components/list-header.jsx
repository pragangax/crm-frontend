import React from "react";
import { ListTitleButton } from "./list-title-button";
import { ReloadOutlined } from "@ant-design/icons";
import { Grid, Button, Space, Radio } from "antd";
import { ListSearch } from "./list-search";
import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { ConfigListTitleButton } from "./config-list-title-button";
import { BackButton } from ".";
import { DeletedItemButton } from ".";
import { useCheckPermission } from "@/hooks/permissions/useCheckPermission";

export const ListHeader = ({
  setView,
  setRefresh,
  toPath,
  pageName,
  view,
  FilterComponent,
  setFilter,
  filters,
  setFilters,
  addButton = true,
  type = "normal",
  backButton = false,
  buttonText,
  backButtonText = "Return",
  deletedItemButtonText = "Deleted Items",
  setShowDeletedItems,
  setShowCreateConfigPopup,
  configType,
}) => {
  const screens = Grid.useBreakpoint();

  const canAddEntity = useCheckPermission(toPath);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: screens.xs ? "1.6rem" : undefined,
        }}
      >
        {backButton && <BackButton text={backButtonText} />}
        {canAddEntity && addButton ? (
          type == "config" ? (
            configType != "sales-stage" && (
              <ConfigListTitleButton
                buttonText={buttonText}
                setShowCreateConfigPopup={setShowCreateConfigPopup}
              />
            )
          ) : (
            <>
              <ListTitleButton toPath={toPath} buttonText={buttonText} />
              {pageName == "user" && (
                <DeletedItemButton
                  buttonText={deletedItemButtonText}
                  setShowDeletedItems={setShowDeletedItems}
                />
              )}
            </>
          )
        ) : null}
        {pageName !== "user" && FilterComponent && (
          <FilterComponent
            filters={filters}
            setFilters={setFilters}
            setFilter={setFilter}
          />
        )}
      </Space>
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: screens.xs ? "1.6rem" : undefined,
        }}
      >
        <Button
          type="default"
          icon={<ReloadOutlined />}
          onClick={() => {
            setRefresh(true);
          }}
        />

        {/* {!pageName && !view && ( */}
        <Space>
          {pageName && <ListSearch pageName={pageName} />}
          {!screens.xs && view ? (
            <Radio.Group value={view} onChange={(e) => setView(e.target.value)}>
              <Radio.Button value="card">
                <AppstoreOutlined />
              </Radio.Button>
              <Radio.Button value="table">
                <UnorderedListOutlined />
              </Radio.Button>
            </Radio.Group>
          ) : null}
        </Space>
      </Space>
    </div>
  );
};
