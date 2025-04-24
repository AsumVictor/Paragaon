
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";

const Settings = () => {
  const { user } = useAuth();
  
  return (
    <Layout>
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Settings</h1>
        
        {user?.role === "admin" ? (
          <div>
            <p className="text-lg text-gray-600 mb-6">
              Welcome to the admin settings panel.
            </p>
            
            <div className="grid gap-6">
              <div className="p-6 border rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2">System Settings</h3>
                <p className="text-gray-500">
                  Configure system-wide settings and preferences.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2">User Management</h3>
                <p className="text-gray-500">
                  Manage user accounts, roles, and permissions.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2">Security Settings</h3>
                <p className="text-gray-500">
                  Configure security options and access controls.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-yellow-50 border border-yellow-100 rounded-lg">
            <p className="text-yellow-700">
              You don't have permission to access this page. This page requires admin privileges.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Settings;
