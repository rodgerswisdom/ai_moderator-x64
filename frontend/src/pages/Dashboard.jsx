import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { workspaceService } from '../services/api';

export default function Dashboard() {
  const { user, isEducator, isStudent } = useAuth();
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const loadWorkspaces = async () => {
    try {
      // TODO: Implement getWorkspaces API endpoint
      // const response = await workspaceService.getWorkspaces();
      // setWorkspaces(response.data);
    } catch (error) {
      console.error('Error loading workspaces:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWorkspace = () => {
    navigate('/workspace/create');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
            <p className="text-gray-600 mb-4">{workspace.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{workspace.studentCount} students</span>
              <span>{workspace.assignmentCount} assignments</span>
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