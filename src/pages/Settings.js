import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faCommentDots, faFileAlt, faPlus, faRocket, faStore } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown } from '@themesberg/react-bootstrap';
import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";
import { GeneralInfoForm } from "../components/Forms";

import {getRole} from "../api"


export default () => {
  const role = getRole;

  return (
    <>
      <Row>
        <Col xs={12} xl={8}>
          <GeneralInfoForm
              role={role}
          />
        </Col>

        <Col xs={12} xl={4}>
          <Row>
            <Col xs={12}>
              <ProfileCardWidget
                  name={"Your"}
                  surname={"Name"}
                  email={"yourEmailexample.com"}
                  phone={112}
              />
            </Col>
          </Row>
        </Col>

      </Row>
    </>
  );
};
