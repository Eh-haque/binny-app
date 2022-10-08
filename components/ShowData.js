import { ScrollView, View } from "react-native";

const ShowData = ({ mainData }) => {
    console.log({ mData: mainData });
    return (
        <ScrollView style={{ width: "80%", marginVertical: 5 }}>
            {mainData?.map((dt, i) => (
                <View key={i}>
                    {dt.caption === "" ? (
                        " "
                    ) : (
                        <Text>Caption: {dt.caption}</Text>
                    )}
                    {dt.name === " " ? "" : <Text>Name: {dt.name}</Text>}
                    {dt.value === " " ? "" : <Text>Value: {dt.value}</Text>}
                </View>
            ))}
        </ScrollView>
    );
};

export default ShowData;
