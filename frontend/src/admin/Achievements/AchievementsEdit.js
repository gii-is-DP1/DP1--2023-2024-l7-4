import { Button, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import { useEffect, useState } from "react";
import tokenService from '../../services/token.service';

const user = tokenService.getUser();

export default function PlayerStadisticLogros() {
  const jwt = tokenService.getLocalAccessToken();
  const userId = user.id;
  
  const [achievements, setAchievements] = useState([]);
  const [successMap, setSuccessMap] = useState({});
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [editedAchievement, setEditedAchievement] = useState({});
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const thresholdOptions = ['','VICTORIES', 'GAMESPLAYED', 'TOTALPLAYTIME']

  const toggleModalEdit = () => setIsModalEdit(!isModalEdit);
  const toggleModalCreate = () => setIsModalCreate(!isModalCreate);
  const toggleModalDelete = () => setIsModalDelete(!isModalDelete);

  const fetchAchievements = async () => {
    try {
      const response = await fetch(`/api/v1/achievements`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error al obtener logros`);
      }
      const result = await response.json();
      setAchievements(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error(error.message);
    }
  };

  const checkSuccess = async (achievementId) => {
    try {
      const response = await fetch(`/api/v1/achievements/${userId}/${achievementId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error al verificar logro`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  useEffect(() => {
    const verifyAchievements = async () => {
      const newSuccessMap = {};
      for (const achievement of achievements) {
        const isSuccess = await checkSuccess(achievement.id);
        newSuccessMap[achievement.id] = isSuccess;
      }
      setSuccessMap(newSuccessMap);
    };

    if (achievements.length > 0) {
      verifyAchievements();
    }
  }, [achievements]);

  useEffect(() => {
    fetchAchievements();
  }, [jwt, userId]);

  const handleCreate = async () => {
    try {
      const response = await fetch(`/api/v1/achievements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(editedAchievement),
      });
      if (!response.ok) {
        throw new Error(`Error al crear logro`);
      }
      toggleModalCreate();
      fetchAchievements();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/v1/achievements/${selectedAchievement.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error al eliminar logro`);
      }
      toggleModalDelete();
      fetchAchievements();
    } catch (error) {
      console.error(error.message);
    }
  };

  
  const handleEdit = (achievement) => {
    setSelectedAchievement(achievement);
    setEditedAchievement({ ...achievement }); 
    toggleModalEdit(); 
  };


  const handleSave = async () => {
    try {
      const response = await fetch(`/api/v1/achievements/${editedAchievement.id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(editedAchievement),
      });
      if (!response.ok) {
        throw new Error(`Error al guardar los cambios`);
      }
      toggleModalEdit(); 
      fetchAchievements();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAchievement((prev) => ({ ...prev, [name]: value }));
  };

  const LogroBox = ({ children }) => (
    <div style={{
      backgroundColor: "khaki",
      padding: "20px",
      borderRadius: "8px",
      textAlign: "center",
      marginBottom: "20px",
      minHeight: "100px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    }}>
      {children}
    </div>
  );

  return (
    <div className="auth-page-purple">
      <Container style={{ marginTop: "5px" }} fluid>
        <h1 className="text-center">Achievements</h1>
        <Row>
          {achievements.length > 0 ? (
            achievements.map((achievement) => (
              <Col sm="6" key={achievement.id}>
                <LogroBox>
                  <p>{achievement.name}</p>
                  <p>{successMap[achievement.id] ? "✔️" : "❌"}</p>
                  <div style={{ position: "absolute", right: "10px", top: "10px" }}>
                    <Button color="warning" size="sm" onClick={() => handleEdit(achievement)}>Edit</Button>
                    {' '}
                    <Button color="danger" size="sm" onClick={() => { setSelectedAchievement(achievement); toggleModalDelete(); }}>Delete</Button>
                  </div>
                </LogroBox>
              </Col>
            ))
          ) : (
            <p>No achievements found</p>
          )}
        </Row>

        <div className="text-center" style={{ marginTop: "20px" }}>
          <Button color="primary" onClick={() => { setEditedAchievement({ name: '', metric: '', threshold: '' }); toggleModalCreate(); }}>Create a new achievement</Button>
        </div>


        <Modal isOpen={isModalEdit} toggle={toggleModalEdit}>
          <ModalHeader toggle={toggleModalEdit}>Edit Achievement</ModalHeader>
          <ModalBody>
            {selectedAchievement && (
              <Form onSubmit={handleSave}>
                <FormGroup>
                  <Label for="achievementName">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="achievementName"
                    value={editedAchievement.name || ''}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="achievementMetric">Metric</Label>
                  <Input
                    type="number"
                    name="metric"
                    id="achievementMetric"
                    value={editedAchievement.metric || ''}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="achievementThreshold">Type</Label>
                  <Input
                    type="select"
                    name="threshold"
                    id="achievementThreshold"
                    value={editedAchievement.threshold || ''}
                    onChange={handleChange}
                  >
                    {thresholdOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                  <div className="custom-button-row">
                  <button className="auth-button">Save</button>
                  </div>
              </Form>
            )}
          </ModalBody>
        </Modal>

        <Modal isOpen={isModalCreate} toggle={toggleModalCreate}>
          <ModalHeader toggle={toggleModalCreate}>Create New Achievement</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="achievementName">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="achievementName"
                  value={editedAchievement.name || ''}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="achievementMetric">Metric</Label>
                <Input
                  type="number"
                  name="metric"
                  id="achievementMetric"
                  value={editedAchievement.metric || ''}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="achievementThreshold">Type</Label>
                <Input
                  type="select"
                  name="threshold"
                  id="achievementThreshold"
                  value={editedAchievement.threshold || ''}
                  onChange={handleChange}
                >
                  {thresholdOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleCreate}>Create</Button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={isModalDelete} toggle={toggleModalDelete}>
          <ModalHeader toggle={toggleModalDelete}>Delete Achievement</ModalHeader>
          <ModalBody>
            Are you sure you want to delete the achievement "{selectedAchievement?.name}"?
          </ModalBody>
          <ModalFooter>

            <Button color="danger" onClick={handleDelete}>Delete</Button>
          </ModalFooter>
        </Modal>


      </Container>
    </div>
  );
}
