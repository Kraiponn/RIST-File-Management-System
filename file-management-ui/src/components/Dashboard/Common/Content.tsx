import { useTranslation } from "react-i18next";

import Layout from "@/components/Dashboard/Common/Layout";


/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 ******************************************************************************************/
export default function Content() {
	const { t } = useTranslation()

	return (
		<Layout title={t("Dashboard.title")}>
			<h1>Document</h1>
		</Layout>
	)
}
