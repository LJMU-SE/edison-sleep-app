import "./Tab2.css";
import { IonAlert, IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { BleClient, BleDevice } from "@capacitor-community/bluetooth-le";
import { useEffect, useState } from "react";
import { refresh } from "ionicons/icons";

const Tab2: React.FC = () => {
    const [devices, setDevices] = useState<BleDevice[]>([]);
    const [isBluetoothEnabled, setIsBluetoothEnabled] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);

    useEffect(() => {
        checkBluetoothStatus();
    }, []);

    const checkBluetoothStatus = async () => {
        setShowAlert(true);
        const isEnabled = await BleClient.isEnabled();
        setIsBluetoothEnabled(isEnabled);
        setShowAlert(false);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Bluetooth Configuration</IonTitle>
                    <IonButton slot="end" onClick={checkBluetoothStatus} className="mr-5">
                        <IonIcon slot="icon-only" icon={refresh} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonAlert isOpen={showAlert} onDidDismiss={() => setShowAlert(false)} header={"Refreshing"} message={"Checking Bluetooth status"} buttons={["OK"]} />
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Bluetooth</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className="container">
                    <strong>Bluetooth Status</strong>
                    <p>Bluetooth is {isBluetoothEnabled ? "enabled" : "disabled"}</p>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Tab2;
