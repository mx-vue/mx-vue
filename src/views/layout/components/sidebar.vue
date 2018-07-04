<template>
	<div class="kd-sidebar" :class="{hidden:!sidebar.opened}">
		<div class="kd-nav">
			<div class="kd-nav-group" v-for="(item, index) in menu" :key="item.name" >
				<div class="kd-nav-group-item">
					<router-link v-if="item.active" class="kd-nav-item-button" :to="item.path">{{item.name}}</router-link>
					<span v-else-if="item.children.length > 0" class="kd-nav-item-button" :to="item.path">{{item.name}}</span>
				</div>
				<div class="kd-nav-item" v-for="child in item.children" :key="child.name">
					<router-link v-if="child.active" class="kd-nav-item-button" :to="child.path">{{child.name}}</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			menu: [],
			namespaces: []
		}
	},
	computed: {
		sidebar() {
			return this.$store.getters.sidebar
		}
	},
	methods: {
	},
	mounted() {
		this.menu = this.$store.getters.menuRouters;
	}
};
</script>
