/* eslint-disable */
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import quest from './quest.svg';
import Input from '../../Components/Atoms/Inputs/Input';
import Button from '../../Components/Atoms/Buttons/Button';
import { saveProject } from '../../Api/auth';
import './CreateFirst.css';
import PageLoader from './PageLoader/PageLoader';

function CreateFirstTeam() {
  const [isloading, setIsloading] = useState(false);
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState();
  const navi = useNavigate();

  const handleChange = (e) => {
    const project = e.target.value;
    setProjects(project);
  };

  const handleInvite = (e) => {
    e.preventDefault();
    const data = e.target.email.value;
    const invite = [...members];
    invite.push({ email: data });
    setMembers(invite);
    e.target.email.value = '';
  };

  const createWorkPlace = async () => {
    try {
      setIsloading(true);
      await saveProject({ project: projects, members });
      navi('/dashboard/board');
    } catch (e) {
      console.error(e);
    } finally {
      setIsloading(false);
      navi('/dashboard/board');
    }

    console.log({ project: projects, members });
  };

  function deleteInvitation(id) {
    const filter = members.filter((elements) => {
      return elements !== id;
    });
    setMembers(filter);
  }

  return (
    <div className="creatz">
      <p>{isloading ? <PageLoader /> : ''}</p>
      <div>
        <img className="imagez" alt="" src={quest} />
      </div>
      <div className="infoz">
        <h1 className='welcome'>Welcome to Questify</h1>
        <h2 className="create">
          Let's create your workspace. A space for teams to collaborate,
          organize, and share project boards.
        </h2>
        <form className="form_control">
          <p className="inputx">Name your workspace</p>
          <Input
            type="text"
            placeholder="Questify Workspace"
            name="project"
            onChange={handleChange}
            className="input2"
          />
          <p>You can also edit this name in your work space</p>

          <div>
            <p className="inputx">Who's on your team? </p>
            <div className="addTeam" onSubmit={handleInvite}>
              <Input
                type="text"
                placeholder="Enter as many email address as you want..."
                name="email"
                className="input2"
              />
              <div className="btn_email">
                <Button
                  type="submit"
                  title="Add"
                  width="80px"
                  height="25px"
                  className="Add"
                />
              </div>
            </div>
          </div>

          <div className="team">
            {members?.map((team, i) => {
              return (
                <div key={i} className="teamMember invitations">
                  <p>&#x2713;</p>
                  <p> {team.email} </p>
                  <p onClick={() => deleteInvitation(team)} className="cross">
                    &#x2717;
                  </p>
                </div>
              );
            })}
          </div>
          <div className="btn_create_workspace">
            <p>
              Invite your team members so they can see what you are working on.
            </p>
            <Button
              type="submit"
              title="Create your workspace"
              className="createWork"
              onClick={createWorkPlace}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateFirstTeam;
