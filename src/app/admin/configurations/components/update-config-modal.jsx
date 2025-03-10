import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  Space,
  Grid,
  theme,
  Row,
  Col,
} from "antd";
import { useUpdateTerritory } from "@/hooks/adminPanel/configurations/territory/useUpdateTerritory";
import { useUpdateIndustry } from "@/hooks/adminPanel/configurations/industry/useUpdateIndustry";
import { useUpdateSubIndustry } from "@/hooks/adminPanel/configurations/sub-industry/useUpdateSubIndustry";
import { useUpdateSolution } from "@/hooks/adminPanel/configurations/solution/useUpdateSolution";
import { roleFormRules } from "@/utilities/formValidationRules";
import { useUpdateSubSolution } from "@/hooks/adminPanel/configurations/sub-solution/useUpdateSubSolution";
import { useUpdateSalesStage } from "@/hooks/adminPanel/configurations/sales-stage/useUpdateSalesStage";
import { useUpdateSalesSubStage } from "@/hooks/adminPanel/configurations/sales-sub-stage/useUpdateSalesSubStage";
import { SalesStageSelector } from "@/components";
import { useUpdateClassification } from "@/hooks/adminPanel/configurations/client/classification/useUpdateClassification";
import { useUpdateIncorporationType } from "@/hooks/adminPanel/configurations/client/incorporationType/useUpdateIncorporationType";
import { useUpdateArcheType } from "@/hooks/adminPanel/configurations/contact/archType/useUpdateArcheType";
import { useUpdateRelationshipDegree } from "@/hooks/adminPanel/configurations/contact/relationshipDegree/useUpdateRelationshipDegree";
import { useUpdateRelationshipStatus } from "@/hooks/adminPanel/configurations/client/relationshipStatus/useUpdateRelationshipStatus";

const UpdateConfigModal = ({
  configType,
  updateConfigData,
  showUpdateConfigPopup,
  setShowUpdateConfigPopup,
}) => {
  console.log("update config data :", updateConfigData);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");

  // Call all hooks unconditionally
  const territoryUpdate = useUpdateTerritory({
    setShowUpdateConfigPopup,
    updateConfigData,
  });
  const industryUpdate = useUpdateIndustry({
    setShowUpdateConfigPopup,
    updateConfigData,
  });
  const subIndustryUpdate = useUpdateSubIndustry({
    setShowUpdateConfigPopup,
    updateConfigData,
  });
  const solutionUpdate = useUpdateSolution({
    setShowUpdateConfigPopup,
    updateConfigData,
  });
  const subSolutionUpdate = useUpdateSubSolution({
    setShowUpdateConfigPopup,
    updateConfigData,
  });
  const salesStageUpdate = useUpdateSalesStage({
    setShowUpdateConfigPopup,
    updateConfigData,
  });
  const salesSubStageUpdate = useUpdateSalesSubStage({
    setShowUpdateConfigPopup,
    updateConfigData,
  });
  //client
  const classificationUpdate = useUpdateClassification({
    setShowUpdateConfigPopup,
    updateConfigData,
  });
  const incorporationTypeUpdate = useUpdateIncorporationType({
    setShowUpdateConfigPopup,
    updateConfigData,
  });
  const relationshipStatusUpdate = useUpdateRelationshipStatus({
    setShowUpdateConfigPopup,
    updateConfigData,
  });

  //contact
  const archeTypeUpdate = useUpdateArcheType({
    setShowUpdateConfigPopup,
    updateConfigData,
  });
  const relationshipDegreeUpdate = useUpdateRelationshipDegree({
    setShowUpdateConfigPopup,
    updateConfigData,
  });

  // Select the correct loading and onFinish based on configType
  let loading, onFinish;
  switch (configType) {
    case "territory":
      loading = territoryUpdate.loading;
      onFinish = territoryUpdate.onFinish;
      break;
    case "industry":
      loading = industryUpdate.loading;
      onFinish = industryUpdate.onFinish;
      break;
    case "sub-industry":
      loading = subIndustryUpdate.loading;
      onFinish = subIndustryUpdate.onFinish;
      break;
    case "solution":
      loading = solutionUpdate.loading;
      onFinish = solutionUpdate.onFinish;
      break;
    case "sub-solution":
      loading = subSolutionUpdate.loading;
      onFinish = subSolutionUpdate.onFinish;
      break;
    case "sales-stage":
      loading = salesStageUpdate.loading;
      onFinish = salesStageUpdate.onFinish;
      break;
    case "sales-sub-stage":
      loading = salesSubStageUpdate.loading;
      onFinish = salesSubStageUpdate.onFinish;
      break;

    //client
    case "classification":
      loading = classificationUpdate.loading;
      onFinish = classificationUpdate.onFinish;
      break;
    case "incorporation-type":
      loading = incorporationTypeUpdate.loading;
      onFinish = incorporationTypeUpdate.onFinish;
      break;
    case "relationship-status":
      loading = relationshipStatusUpdate.loading;
      onFinish = relationshipStatusUpdate.onFinish;
      break;

    //contact
    case "arche-type":
      loading = archeTypeUpdate.loading;
      onFinish = archeTypeUpdate.onFinish;
      break;

    case "relationship-degree":
      loading = relationshipDegreeUpdate.loading;
      onFinish = relationshipDegreeUpdate.onFinish;
      break;

    default:
      loading = false;
      onFinish = () => {}; // No-op function if configType is invalid
      break;
  }

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setShowUpdateConfigPopup(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setShowUpdateConfigPopup(false);
  };

  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    form.setFieldsValue(updateConfigData);
  }, [updateConfigData, form]);

  return (
    <div>
      <Modal
        title={configType}
        open={showUpdateConfigPopup}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <p>{modalText}</p>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          // size={"default"}
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="Label"
                name="label"
                rules={roleFormRules.roleName}
              >
                <Input />
              </Form.Item>
            </Col>
            {configType == "sales-sub-stage" && (
              <Col span={8}>
                <SalesStageSelector
                  name="salesStage"
                  label="Sales Stage"
                  // rules={opportunityFormRules.salesStage}
                />
              </Col>
            )}
            <Col span={24}>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                  </Button>
                  <Button
                    type="default"
                    htmlType="button"
                    onClick={() => form.resetFields()}
                    disabled={loading}
                  >
                    Reset
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateConfigModal;
