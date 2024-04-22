
$(document).ready(function () {

    const connection = new signalR.HubConnectionBuilder().withUrl("/typesafehub").configureLogging(signalR.LogLevel.Information).build();
    function start() {
        connection.start().then(() => {
            $("#coonection-id").text(connection.connectionId);
            console.log("hub ile baglanti basarili")
        });
    }
    try {
        start();
    } catch (e) {
        setTimeout(() => start(), 5000)
    }

    const brodcastMessageToSpecificClient = "BrodcastMessageToSpecificClient";
    const receiverMessageForSpecificClient = "ReceiverMessageForSpecificClient";
    const brodcastMessageToAllClientHubMethodCall = "BrodcastMessageToAllClient";
    const brodcastMessageToCallerClient = "BrodcastMessageToCallerClient";
    const onConnectedAsync = "OnConnectedAsync";
    const onDisconnectedAsync = "OnDisconnectedAsync";
    const receiverMessageForCallerClient = "ReceiverMessageForCallerClient";
    const brodcastMessageToOtherClient = "BrodcastMessageToOtherClient";
    const receiverMessageForOtherClient = "ReceiverMessageForOtherClient";
    const receiverMessageForAllClient = "ReceiverMessageForAllClient";
    const receiverconnectionCountForAllClient = "ReceiverconnectionCountForAllClient";

    const GrupA = "GrupA";
    const GrupB = "GrupB";
    let currentGroupList = [];
    function refleshGroupList() {
        $("#group-list").empty();
        currentGroupList.forEach(element => {
            $("#group-list").append(element);
        });

        $("#group-add-a").click(function () {
            if (currentGroupList.includes(GrupA)) return;
            connection.on("AddToGroup", GrupA).then(() => {
                currentGroupList.push(GrupA);

                refleshGroupList();
            });
        });
        $("#group-leave-a").click(function () {
            connection.on("LeaveGroup", GrupA).then(() => {
                currentGroupList = currentGroupList.filter(x => x !== GrupA);
                refleshGroupList();
            });
        });

        $("#group-add-b").click(function () {
            connection.on("AddToGroup", GrupA).then(() => {
                if (currentGroupList.includes(GrupB)) return;

                currentGroupList.push(GrupA);
                refleshGroupList();
            });
        });
        $("#group-leave-b").click(function () {
            connection.on("LeaveGroup", GrupB).then(() => {
                currentGroupList = currentGroupList.filter(x => x !== GrupB);

                refleshGroupList();
            });
        });
    });
//subcribe
connection.on(ReceiverconnectionCountForAllClient)((count) => {
    console.log("bagli olan client sayısı:" + count);
});
connection.on(receiverMessageForAllClient)((message) => {
    $("#connection-all").text("Bagli Client Sayisi:" + message);
})
connection.on(receiverMessageForSpecificClient)((message) => {
    $("#connection-specific").text("specific Client Mesajı:" + message);
})
connection.on(receiverMessageForCallerClient)((message) => {
    $("#connection-count").text("(Caller Client Mesajı:" + message + "))");
})
connection.on(receiverconnectionCountForAllClient)((message) => {
    $("#connection-count").text("(other Client Mesajı:" + message + "))");
})
connection.on(BrodcastMessageToModelClient)((model) => {
    $("#connection-model").text("(modelden gelen  Mesajı:" + model + "))");
})
$("#btn-sen-message-specific-client").click(function () {

    connection.invoke(brodcastMessageToSpecificClient, connectionId, "specific cliente merhaba").catch(function (err) {
        console.log("hata:" + err)
    });
});
$("#btn-sen-message-model-client").click(function () {
    const product = {
        Id: 1,
        name: pen,
        price: 100,
        
    }
    connection.invoke(ReceiverMessageForModelClient, product).catch(function (err) {
        console.log("hata:" + err)

        console.log("urun gonderildi");
    });
});
$("#btn-sen-message-caller-client").click(function () {

    connection.invoke(brodcastMessageToCallerClient, "caller cliente merhaba").catch(function (err) {
        console.log("hata:" + err)
    });
});
$("#btn-sen-message-all-client").click(function () {

    connection.invoke(brodcastMessageToAllClientHubMethodCall, "tum clientlere merhaba").catch(function (err) {
        console.log("hata:" + err)
    });

    connection.invoke(brodcastMessageToOtherClient).catch(function (err) {
        console.log("hata:" + err)

    });
    connection.invoke(onConnectedAsync).catch(function (err) {
        console.log("hata:" + err)

    });

    connection.invoke(onDisconnectedAsync).catch(function (err) {
        console.log("hata:" + err)
    });

});










