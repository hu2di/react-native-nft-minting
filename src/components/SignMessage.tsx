import { View, Text, StyleSheet, Pressable } from "react-native";
import { useSignMessage, useAccount } from "wagmi";

export default function SignMessage() {
  const { isConnected } = useAccount();
  const { data, isError, isPending, isSuccess, signMessage } = useSignMessage();

  return (
    <View style={styles.container}>
      <Pressable 
        disabled={isPending || !isConnected}
        onPress={() => signMessage({ message: 'Hello, world!' })}
        style={[styles.button, !isConnected && styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>Sign Message</Text>
      </Pressable>
      {!isConnected && <Text style={styles.text}>Please connect wallet first</Text>}
      {isPending && <Text style={styles.text}>Signing...</Text>}
      {isError && <Text style={styles.text}>Error signing message</Text>}
      {isSuccess && <Text style={styles.text}>Message signed: {data}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  text: {
    marginTop: 10,
    color: 'black',
  }
});
