import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '../../store/useThemeStore';
import { usePlanStore } from '../../store/usePlanStore';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

export default function MyPlansScreen() {
    const { colors, mode } = useThemeStore();
    const router = useRouter();
    const { plans, addPlan } = usePlanStore();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newPlanName, setNewPlanName] = useState('');
    const [newPlanDate, setNewPlanDate] = useState('');

    const handleCreatePlan = () => {
        if (newPlanName.trim()) {
            addPlan(newPlanName, newPlanDate || 'TBD');
            setNewPlanName('');
            setNewPlanDate('');
            setIsModalVisible(false);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>My Plans</Text>
                <TouchableOpacity
                    style={[styles.addButton, { backgroundColor: colors.primary }]}
                    onPress={() => setIsModalVisible(true)}
                >
                    <Ionicons name="add" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <FlatList
                contentContainerStyle={styles.listContent}
                data={plans}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.planCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                        activeOpacity={0.9}
                        onPress={() => router.push(`/plan/${item.id}`)}
                    >
                        <Image source={{ uri: item.image }} style={styles.planImage} />
                        <View style={styles.planInfo}>
                            <View style={styles.planHeader}>
                                <Text style={[styles.planTitle, { color: colors.text }]}>{item.name}</Text>
                                <View style={[styles.dateBadge, { backgroundColor: colors.background }]}>
                                    <Text style={[styles.dateText, { color: colors.textSecondary }]}>{item.date}</Text>
                                </View>
                            </View>

                            <View style={styles.planFooter}>
                                <View style={styles.statsContainer}>
                                    <View style={styles.stat}>
                                        <Ionicons name="location" size={16} color={colors.primary} />
                                        <Text style={[styles.statText, { color: colors.textSecondary }]}>
                                            {item.placesCount} Places
                                        </Text>
                                    </View>
                                    <View style={styles.stat}>
                                        <Ionicons name="wallet-outline" size={16} color={colors.secondary} />
                                        <Text style={[styles.statText, { color: colors.textSecondary }]}>
                                            ${item.totalBudget}
                                        </Text>
                                    </View>
                                </View>

                                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Ionicons name="calendar-outline" size={64} color={colors.textSecondary} style={{ marginBottom: 16 }} />
                        <Text style={[styles.emptyTitle, { color: colors.text }]}>No plans yet</Text>
                        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                            Start exploring and add places to your itinerary.
                        </Text>
                        <PrimaryButton
                            label="Create New Plan"
                            style={{ marginTop: 20 }}
                            onPress={() => setIsModalVisible(true)}
                        />
                    </View>
                }
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.modalOverlay}
                    >
                        <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
                            <View style={styles.modalHeader}>
                                <Text style={[styles.modalTitle, { color: colors.text }]}>New Plan</Text>
                                <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                                    <Ionicons name="close" size={24} color={colors.textSecondary} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={[styles.label, { color: colors.text }]}>Plan Name</Text>
                                <TextInput
                                    style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
                                    placeholder="e.g. Tokyo Trip"
                                    placeholderTextColor={colors.textSecondary}
                                    value={newPlanName}
                                    onChangeText={setNewPlanName}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={[styles.label, { color: colors.text }]}>Date (Optional)</Text>
                                <TextInput
                                    style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
                                    placeholder="e.g. Oct 12 - 14"
                                    placeholderTextColor={colors.textSecondary}
                                    value={newPlanDate}
                                    onChangeText={setNewPlanDate}
                                />
                            </View>

                            <PrimaryButton
                                label="Create Plan"
                                onPress={handleCreatePlan}
                                disabled={!newPlanName.trim()}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    addButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        gap: 20,
    },
    planCard: {
        borderRadius: 20,
        borderWidth: 1,
        overflow: 'hidden',
    },
    planImage: {
        width: '100%',
        height: 150,
    },
    planInfo: {
        padding: 16,
    },
    planHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    planTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 10,
    },
    dateBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
    },
    dateText: {
        fontSize: 12,
        fontWeight: '600',
    },
    planFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statsContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statText: {
        fontSize: 14,
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 60,
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
        gap: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
    },
});
