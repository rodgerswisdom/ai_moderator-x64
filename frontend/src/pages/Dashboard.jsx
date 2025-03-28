import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { assignmentService, workspaceService } from '../services/api';
import ChatWindow from '../components/ChatWindow';
import RichTextEditor from '../components/layout/RichTextEditor';


export default function Dashboard() {
  const { user, isEducator, isStudent } = useAuth();
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState([]);
  const [studentWorkspaces, setStudentWorkspaces] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkspaces();
    loadStudentWorkspaces();
  }, []);

  useEffect(() => {
    if (studentWorkspaces.length > 0) {
      loadAssignmnets();
    }
  }, [studentWorkspaces]); 

  const loadWorkspaces = async () => {
    try {
      const response = await workspaceService.getWorkspace(user._id);
      setWorkspaces(response || []);
    } catch (error) {
      console.error('Error loading workspaces:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStudentWorkspaces = async () => {
    try {
      const studentResponse = await workspaceService.getStudentWorkspace(user._id);
      setStudentWorkspaces(studentResponse || []);
    } catch (error) {
      console.error('Error loading workspaces:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAssignmnets = async () => {
    try {
      const workspaceIds = studentWorkspaces.map((studentWorkspace) => studentWorkspace._id);
      // console.log(workspaceIds);

      // Use Promise.all to resolve all promises
      const assignmentsArray = await Promise.all(
        workspaceIds.map((id) => assignmentService.getWorkSpcaceAssignments(id))
      );

      // Flatten the array if assignments are returned as arrays
      const allAssignments = assignmentsArray.flat();
      console.log(allAssignments);

      setAssignments(allAssignments || []);
    } catch (error) {
      console.error('Error loading assignments:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleCreateWorkspace = () => {
    navigate('/workspaces');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isStudent) {
    return (
      <div className="container mx-auto px-4 py-8">
       
        <div className="grid grid-cols-12 gap-4 min-h-screen">
          
          <div className="col-span-3 bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl text-black font-bold mb-4">Welcome, {user?.f_name} {user?.l_name}</h2>
            {studentWorkspaces.map((studentWorkspaces) => (
              <div key={studentWorkspaces._id} className="mb-4">
                <h3 className="text-lg font-semibold">{studentWorkspaces.name}</h3>
                
              </div>
              
            ))}
            
            

            {studentWorkspaces.length === 0 && (
              <p className="text-gray-600">
                You haven't joined any workspaces yet.
              </p>
            )}
          </div>
          <div>
          {assignments.map((assignments) => (
                  <div key={assignments._id} className="flex justify-between items-center text-sm text-gray-500">
                    <span>{assignments.description}</span>
                    {/* <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span> */}
                  </div>
                ))}
          </div>
          
          <RichTextEditor />
          

          {/* <ChatWindow /> */}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user?.f_name} {user?.l_name}
        </h1>
        {isEducator && (
          <button
            onClick={handleCreateWorkspace}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Create New Workspace
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workspaces.map((workspace) => (
          <div
            key={workspace._id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/workspace/${workspace._id}`)}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {workspace.name}
            </h2>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{workspace.students.length} students</span>
            </div>
          </div>
        ))}
      </div>

      {workspaces.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            {isEducator
              ? "You haven't created any workspaces yet. Create one to get started!"
              : "You haven't joined any workspaces yet."}
          </p>
        </div>
      )}
    </div>
  );
}