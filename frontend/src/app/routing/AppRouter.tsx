import ObjectUnit from "@pages/objectUnit/ObjectUnit";
import Auth from "@pages/auth/ui/Auth";
import Objects from "@pages/objects/ui/Objects";
import Storages from "@pages/storages/ui/Storages";
import StorageUnit from "@pages/storageUnit/StorageUnit";
import AuthLayout from "@shared/ui/layouts/Auth/AuthLayout";
import MainLayout from "@shared/ui/layouts/MainLayout";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Outlet,
	redirect,
	Route,
} from "react-router-dom";
import getStorages from "@features/api/axios/requests/storages/getStorages";
import getStorageUnit from "@features/api/axios/requests/storages/getStorageUnit";
import getObjectUnit from "@features/api/axios/requests/objects/getObjectUnit";
import TreePage from "@pages/tree/TreePage";
import Settings from "@pages/settings/Settings";
import type { JSX } from "@emotion/react/jsx-runtime";

const ProtectedLayout = () => {
	const token = localStorage.getItem("accessToken");

	if (!token) {
		return <Navigate to="/auth" replace />;
	}

	return <Outlet />;
};

const UnauthOnly = ({ children }: { children: JSX.Element }) => {
	const token = localStorage.getItem("accessToken");

	if (token) {
		return <Navigate to="/" replace />;
	}

	return children;
};

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<Outlet />}>
			<Route element={<ProtectedLayout />}>
				<Route path="/" element={<MainLayout />}>
					<Route
						index
						element={<></>}
						loader={() => redirect("/storages")}
					/>

					<Route path="/storages/">
						<Route
							index
							element={<Storages />}
							loader={getStorages}
						/>
						<Route
							path="/storages/:id"
							element={<StorageUnit />}
							loader={getStorageUnit}
						/>
					</Route>

					<Route path="/objects/">
						<Route index element={<Objects />} />
						<Route
							path="/objects/:id"
							element={<ObjectUnit />}
							loader={getObjectUnit}
						/>
					</Route>

					<Route path="tree">
						<Route index element={<TreePage />} />
						<Route path=":id?" element={<TreePage />} />
					</Route>

					<Route path="/history/" element={<></>} />
					<Route path="/settings/" element={<Settings />} />
				</Route>
			</Route>

			<Route
				path="/auth"
				element={
					<UnauthOnly>
						<AuthLayout />
					</UnauthOnly>
				}
			>
				<Route index element={<Auth />} />
			</Route>
		</Route>
	)
);

export default router;
