import { Tabs } from "expo-router";
import images from '../../../constants/icons';
import TabItem from "../TabItem/TabItem";

const tabsData = [{
    id: 1,
    tabName: "home",
    title: "Home",
    name: "Главная",
    icon: images.notes
}, {
    id: 2,
    tabName: "create",
    title: "Create",
    name: "Создать",
    icon: images.create
}]

const TabsList = () => {

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#bd9521",
                tabBarInactiveTintColor: "#f3ce6e",
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#AE0001",
                    borderTopWidth: 3,
                    borderTopColor: "#232533",
                    height: 90,
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between'
                },
            }}
        >
            {tabsData.map(tab => (
                <Tabs.Screen key={tab.id}
                    name={tab.tabName}
                    options={{
                        title: tab.title,
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <TabItem
                                color={color}
                                name={tab.name}
                                icon={tab.icon}
                            />
                        ),
                    }}
                />
            ))}
        </Tabs>
    );
};

export default TabsList


// icon: {
//         width: 30,
//         height: 30
//     },
//     tab: {
//         position: 'absolute',
//         top: 4,
//         width: 70,
//         display: 'flex',
//         alignItems: 'center',
//     },