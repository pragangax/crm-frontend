"use client";
import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Grid,
  theme,
  Row,
  Col,
  DatePicker,
  Divider,
} from "antd";
import { StageSelector } from "../enums";
import {
  ClientSelector,
  OpportunitySelector,
  UserSelector,
  FormHeader,
  BulkUploadModal,
  CurrencyAmountInput,
} from "@/components";
import { tenderFormRules } from "@/utilities/formValidationRules";
import { useAddTender } from "@/hooks/tender";
import { colorConfig } from "@/config";
import { Text } from "@/components";

const AddTender = () => {
  const [uploadModal, setUploadModal] = useState(false);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { loading, onFinish } = useAddTender();

  // Define dynamic span for different screen sizes
  const colSpan = {
    xs: 24, // 1 field per row on mobile
    sm: 12, // 2 fields per row on small tablets
    md: 6, // 4 fields per row on desktop and larger
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // Full viewport height
      }}
    >
      <FormHeader
        fileUpload={false}
        setUploadModal={setUploadModal}
        backButtonText={"Return"}
      />
      <Space
        direction="vertical"
        style={{
          marginTop: "24px",
          width: "100%",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          padding: !screens.xs ? "32px" : "16px",
          // flex: "1", // Takes remaining space below header
          overflow: "scroll", // Prevent overflow
          scrollbarWidth: "none",
        }}
      >
        <Form
          onFinish={onFinish}
          layout="vertical"
          initialValues={{}}
          form={form}
        >
          {/* RFP Details Section */}
          <Space>
            <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
              RFP Details
            </Text>
          </Space>
          <Divider style={{ margin: "10px" }} />
          <Row gutter={24}>
            <Col {...colSpan}>
              <Form.Item
                name="rfpDate"
                label="RFP Date"
                rules={tenderFormRules.rfpDate}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <Form.Item
                name="submissionDueDate"
                label="Submission Due Date"
                rules={tenderFormRules.submissionDueDate}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <ClientSelector
                name="client"
                label="Client Name"
                disabled={true}
              />
            </Col>
            <Col {...colSpan}>
              <Form.Item
                name="reference"
                label="Reference"
                rules={tenderFormRules.reference}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {/* Tender Details Section */}
          <Space>
            <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
              Tender Details
            </Text>
          </Space>
          <Divider style={{ margin: "10px" }} />
          <Row gutter={24}>
            <Col {...colSpan}>
              <Form.Item
                name="rfpTitle"
                label="RFP Title"
                rules={tenderFormRules.rfpTitle}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <Form.Item
                name="rfpSource"
                label="How did we receive RFP?"
                rules={tenderFormRules.rfpSource}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <OpportunitySelector
                name="associatedOpportunity"
                label="Associated Opportunity"
                rules={tenderFormRules.associatedOpportunity}
              />
            </Col>
          </Row>

          {/* Bond Information Section */}
          <Space>
            <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
              Bond Information
            </Text>
          </Space>
          <Divider style={{ margin: "10px" }} />
          <Row gutter={24}>
            <Col {...colSpan}>
              <Form.Item name="bond" label="Bond" rules={tenderFormRules.bond}>
                <Select>
                  <Select.Option value={true}>Yes</Select.Option>
                  <Select.Option value={false}>No</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <CurrencyAmountInput
                name="bondValue"
                label="Bond Value"
                rules={tenderFormRules.bondValue}
              />
            </Col>
            <Col {...colSpan}>
              <Form.Item
                name="bondIssueDate"
                label="Bond Issue Date"
                rules={tenderFormRules.bondIssueDate}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <Form.Item
                name="bondExpiry"
                label="Bond Valid Until"
                rules={tenderFormRules.bondValidUntil}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          {/* Submission Details Section */}
          <Space>
            <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
              Submission Details
            </Text>
          </Space>
          <Divider style={{ margin: "10px" }} />
          <Row gutter={24}>
            <Col {...colSpan}>
              <Form.Item
                name="submissionMode"
                label="Submission Mode"
                rules={tenderFormRules.submissionMode}
              >
                <Select>
                  <Select.Option value={"Email"}>Email</Select.Option>
                  <Select.Option value={"Hard Copy"}>Hard Copy</Select.Option>
                  <Select.Option value={"Portal"}>Portal</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <Form.Item
                name="evaluationDate"
                label="Evaluation Date"
                rules={tenderFormRules.evaluationDate}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <UserSelector
                name="officer"
                label="Tender Officer"
                rules={tenderFormRules.tenderOfficer}
              />
            </Col>
            <Col {...colSpan}>
              <UserSelector
                name="bidManager"
                label="Bid Manager"
                rules={tenderFormRules.bidManager}
              />
            </Col>
          </Row>

          {/* Tender Stage Section */}
          <Space>
            <Text style={{ color: colorConfig?.primary, fontWeight: "500" }}>
              Tender Stage
            </Text>
          </Space>
          <Divider style={{ margin: "10px" }} />
          <Row gutter={24}>
            <Col {...colSpan}>
              <StageSelector
                name="stage"
                label="Tender Stage"
                rules={tenderFormRules.tenderStage}
              />
            </Col>
            <Col {...colSpan}>
              <Form.Item
                name="stageExplanation"
                label="Stage Explanation"
                rules={tenderFormRules.stageExplanation}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <Form.Item
                name="submissionDate"
                label="Submission Date"
                rules={tenderFormRules.submissionDate}
              >
                <DatePicker disabled style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          {/* Form Action Buttons */}
          <Row gutter={24}>
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
        <BulkUploadModal
          setOpen={setUploadModal}
          open={uploadModal}
          resource="tender"
        />
      </Space>
    </div>
  );
};

export default AddTender;
