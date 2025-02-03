import React from "react";
import { Button, Space } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  ArrowRightOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useCheckPermission } from "@/hooks/permissions/useCheckPermission";
import { useDispatch } from "react-redux";
import { userActions } from "@/redux/slices/userSlice";
import { configurationActions } from "@/redux/slices/configurationSlice";
import { leadActions } from "@/redux/slices/leadSlice";
import { useSelector } from "react-redux";

export const LeadsTableActions = ({
  setUpdateConfigData,
  updateConfigData,
  setShowUpdateConfigPopup = null,
  showUrl = "",
  deleteUrl = "",
  onDelete = null,
  permissionUrl = null,
  record = {},
  deleteAction = true,
  detailsAction = true,
  updateAction = false,
  lead = true,
  deletePopupFor = "n/a",
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const canSeeDetails = useCheckPermission(permissionUrl || showUrl);
  const canDelete = useCheckPermission(deleteUrl);
  const convertAction = useCheckPermission("/deal/add-deal");

  const handleConvertIntoLead = () => {
    dispatch(leadActions.setConvertLead(record));
    router.push("/deal/add-deal");
  };

  return (
    <>
      <Space>
        {/* {detailsAction && (
          <Button
            size="small"
            disabled={!canSeeDetails}
            onClick={() => {
              if (record.updateConfigPopup) {
                setUpdateConfigData(updateConfigData);
                setShowUpdateConfigPopup(true);
              } else {
                router.push(showUrl);
              }
            }}
            icon={<EyeOutlined />}
          />
        )}
        {updateAction && (
          <Button
            size="small"
            disabled={!canSeeDetails}
            onClick={() => {
              if (record.updateConfigPopup) {
                setUpdateConfigData(updateConfigData);
                setShowUpdateConfigPopup(true);
              }
            }}
            icon={<EditOutlined />}
          />
        )}
        {deleteAction && (
          <Button
            onClick={() => {
              console.log("deletion clicked");
              if (deletePopupFor == "n/a") {
                router.push(deleteUrl);
              } else {
                if (deletePopupFor == "user") {
                  dispatch(
                    userActions.setDeleteUserPopup({ open: true, user: record })
                  );
                } else {
                  dispatch(
                    configurationActions.setDeleteConfigPopup({
                      open: true,
                      configType: deletePopupFor,
                      configData: record,
                    })
                  );
                }
              }
            }}
            disabled={!canDelete}
            size="small"
            danger
            icon={<DeleteOutlined />}
          />
        )} */}
        <Button
          size="medium"
          type="primary"
          onClick={handleConvertIntoLead}
          icon={record?.converted ? <CheckOutlined /> : <ArrowRightOutlined />}
          iconPosition="end"
          disabled={!convertAction || record?.converted}
        >
          {record?.converted
            ? "Already Converted Into Deal"
            : "Convert Into Deal"}
        </Button>
      </Space>
    </>
  );
};
