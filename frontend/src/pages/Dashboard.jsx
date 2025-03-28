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
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkspaces();
    loadStudentWorkspaces();
  }, []);

  useEffect(() => {
    if (studentWorkspaces.length > 0) {
      loadAssignments();
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

  const loadAssignments = async () => {
    try {
      const workspaceIds = studentWorkspaces.map((studentWorkspace) => studentWorkspace._id);

      const assignmentsArray = await Promise.all(
        workspaceIds.map((id) => assignmentService.getWorkSpcaceAssignments(id))
      );

      const allAssignments = assignmentsArray.flat();
      setAssignments(allAssignments || []);
    } catch (error) {
      console.error('Error loading assignments:', error);
    }
  };

  const handleAssignmentChange = (e) => {
    const assignmentId = e.target.value;
    const assignment = assignments.find((a) => a._id === assignmentId);
    setSelectedAssignment(assignment);
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
          {/* Left Panel: Student Profile and Workspaces */}
          <div className="col-span-3 bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Welcome, {user?.f_name} {user?.l_name}</h2>
            <h3 className="text-lg font-semibold mb-2">Your Workspaces</h3>
            {studentWorkspaces.map((workspace) => (
              <div key={workspace._id} className="mb-4">
                <h4 className="text-md font-medium">{workspace.name}</h4>
              </div>
            ))}
            {studentWorkspaces.length === 0 && (
              <p className="text-gray-600">You haven't joined any workspaces yet.</p>
            )}
          </div>

          {/* Center Panel: Assignments Dropdown and RichTextEditor */}
          <div className="col-span-6 bg-white p-4 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="assignment-select" className="block text-lg font-medium mb-2">
                Select an Assignment
              </label>
              <select
                id="assignment-select"
                className="w-full border border-gray-300 rounded-lg p-2"
                onChange={handleAssignmentChange}
                value={selectedAssignment?._id || ''}
              >
                <option value="" disabled>
                  -- Select an Assignment --
                </option>
                {assignments.map((assignment) => (
                  <option key={assignment._id} value={assignment._id}>
                    {assignment.description}
                  </option>
                ))}
              </select>
            </div>
            {selectedAssignment ? (
              <RichTextEditor assignmentId={selectedAssignment._id} />
            ) : (
              <p className="text-gray-600">Please select an assignment to start working.</p>
            )}
          </div>

          {/* Right Panel: Chat Interface */}
          <div className="col-span-3 bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Chat Assistant</h2>
            <ChatWindow />
          </div>
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
            onClick={() => navigate('/workspaces')}
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
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{workspace.name}</h2>
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